const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const WeatherApi = require('../../services/externalAPI');
const {
  findClosestHourlyForecasts,
  findDailyForecasts,
} = require('./helpers/weatherHelpers');

const weatherResolver = {
  Query: {
    weather: async (_, { lat, lon, time }) => {
      const parsedResponse = await WeatherApi.fetchWeatherByLocation(lat, lon);

      const foundHourlies = findClosestHourlyForecasts(
        parsedResponse.hourly,
        time
      );

      const lastHourlyDate = dayjs.utc(
        foundHourlies[foundHourlies.length - 1].time
      );
      const dailyForecasts = findDailyForecasts(
        parsedResponse.daily,
        time,
        lastHourlyDate
      );

      return [...foundHourlies, ...dailyForecasts];
    },
  },
};

module.exports = weatherResolver;
