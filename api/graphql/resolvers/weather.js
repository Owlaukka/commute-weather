const dayjs = require('dayjs');

const ExternalApi = require('../../services/externalAPI');

const weatherResolver = {
  Query: {
    weather: async (_, { lat, lon, time }) => {
      const parsedResponse = await ExternalApi.fetchWeatherByLocation(lat, lon);
      console.log(process.env.NODE_ENV);
      // TODO: optimize and clarify this, and maybe Time and Datetime custom scalars as well
      const [hours, minutes] = time;
      const requestedWeatherData = parsedResponse.hourly.filter((weather) => {
        const requestedTimeOnInspectedDay = dayjs
          .unix(weather.dt)
          .startOf('day')
          .hour(hours)
          .minute(minutes);
        const difference = requestedTimeOnInspectedDay.diff(
          dayjs.unix(weather.dt),
          'minutes'
        );
        return (
          (difference > 0 && difference < 30) ||
          (difference <= 0 && difference > -31)
        );
      });

      return requestedWeatherData.map((weather) => ({
        lat,
        lon,
        time: dayjs
          .unix(weather.dt)
          .startOf('day')
          .hour(hours)
          .minute(minutes)
          .format(),
        temperature: Math.round(weather.temp * 10) / 10,
        weather: weather.weather.map((weat) => weat.main),
        humidity: weather.humidity,
      }));
    },
  },
};

module.exports = weatherResolver;
