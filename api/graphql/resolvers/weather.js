const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const dayOfYear = require('dayjs/plugin/dayOfYear');

dayjs.extend(dayOfYear);
dayjs.extend(utc);

const WeatherApi = require('../../services/externalAPI');

const roundToOneDecimal = (number) => Math.round(number * 10) / 10;

// TODO: change the format of weather to account for daily forecasts
const formatHours = (weathers, time) => {
  return weathers.map((weather) => ({
    time: dayjs
      .utc(weather.dt * 1000)
      .hour(time.hour())
      .minute(time.minute())
      .format(),
    temperature: roundToOneDecimal(weather.temp),
    weather: weather.weather.map((weat) => weat.main),
    humidity: weather.humidity,
  }));
};

const formatDays = (weathers, time) => {
  return weathers.map((weather) => ({
    time: dayjs
      .utc(weather.dt * 1000)
      .hour(time.hour())
      .minute(time.minute())
      .format(),
    temperature: roundToOneDecimal((weather.temp.min + weather.temp.max) / 2),
    weather: weather.weather.map((weat) => weat.main),
    humidity: weather.humidity,
  }));
};

const findClosestHours = (weathers, comparisonDates, time) =>
  formatHours(
    comparisonDates.map((date) =>
      weathers.find((weather) => {
        const difference = date.diff(dayjs.utc(weather.dt * 1000), 'minutes');
        return (
          (difference > 0 && difference < 30) ||
          (difference <= 0 && difference > -31)
        );
      })
    ),
    time
  );

const findClosestDays = (weathers, comparisonDates, time) =>
  formatDays(
    comparisonDates.map((date) =>
      weathers.find(
        (weather) =>
          dayjs.utc(weather.dt * 1000).dayOfYear() === date.dayOfYear()
      )
    ),
    time
  );

const weatherResolver = {
  Query: {
    weather: async (_, { lat, lon, time, numberOfForecasts = 4 }) => {
      const parsedResponse = await WeatherApi.fetchWeatherByLocation(lat, lon);

      const timeObject = dayjs(time).utc();
      const datetimesWanted = [];
      for (let i = 0; i < numberOfForecasts; i++) {
        datetimesWanted.push(timeObject.add(i, 'day'));
      }

      const amountOfHourlies =
        timeObject.dayOfYear() ===
        dayjs.utc(parsedResponse.hourly[0].dt * 1000).dayOfYear()
          ? 2
          : 1;

      const closestHours = findClosestHours(
        parsedResponse.hourly,
        datetimesWanted.slice(0, amountOfHourlies),
        timeObject
      );

      const closestDays = findClosestDays(
        parsedResponse.daily,
        datetimesWanted.slice(amountOfHourlies),
        timeObject
      );

      return [...closestHours, ...closestDays];
    },
  },
};

module.exports = weatherResolver;
