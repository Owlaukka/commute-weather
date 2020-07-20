const got = require('got');
const dayjs = require('dayjs');

const weatherResolver = {
  Query: {
    weather: async (_, { lat, lon, time }) => {
      const apiKey = process.env.WEATHER_API_KEY;
      // TODO: add error-handling
      const response = await got(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`
      );
      const parsedResponse = JSON.parse(response.body);

      // TODO: optimize this and maybe Time and Datetime custom  scalars
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
        lat: lat,
        lon: lon,
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
