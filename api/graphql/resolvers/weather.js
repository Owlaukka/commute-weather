const got = require('got');
const dayjs = require('dayjs');

const weatherResolver = {
  Query: {
    weather: async (_, { lat, lon, times }) => {
      const apiKey = process.env.WEATHER_API_KEY;
      const response = await got(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`
      );
      const parsedResponse = JSON.parse(response.body);
      const requestedWeatherData = parsedResponse.hourly.filter(
        (weatherPoint) =>
          times.some(
            (time) =>
              Math.abs(dayjs.unix(weatherPoint.dt).diff(time, 'minute')) < 30
          )
      );

      return requestedWeatherData.map((weather) => ({
        lat: lat,
        lon: lon,
        time: dayjs.unix(weather.dt).format(),
        temperature: weather.temp,
        weather: weather.weather.map((weat) => weat.main),
        humidity: weather.humidity,
      }));
    },
  },
};

module.exports = weatherResolver;
