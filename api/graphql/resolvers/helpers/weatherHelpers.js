const dayjs = require('dayjs');

const roundToOneDecimal = (number) => Math.round(number * 10) / 10;

const formatHour = (weather, time) => ({
  time,
  temperature: {
    isDaily: false,
    temp: roundToOneDecimal(weather.temp),
  },
  weather: weather.weather.map((weat) => ({
    main: weat.main,
    icon: weat.icon,
  })),
  humidity: weather.humidity,
});

const formatDay = (weather, time) => ({
  time,
  temperature: {
    isDaily: true,
    min: roundToOneDecimal(weather.temp.min),
    max: roundToOneDecimal(weather.temp.max),
  },
  weather: weather.weather.map((weat) => ({
    main: weat.main,
    icon: weat.icon,
  })),
  humidity: weather.humidity,
});

const findClosestHourlyForecasts = (
  weatherData,
  [requestedHour, requestedMinute]
) =>
  weatherData.reduce((acc, weather) => {
    const weatherTime = dayjs.utc(weather.dt * 1000);
    const difference = requestedHour - weatherTime.hour();

    const isAfterForecast = difference < 1 && difference >= 0;
    if (requestedMinute < 30 && isAfterForecast) {
      return [
        ...acc,
        formatHour(
          weather,
          weatherTime.add(requestedMinute, 'minute').format()
        ),
      ];
    }
    const isBeforeForecast =
      (difference > -2 && difference < 0) || difference === 23;
    if (requestedMinute >= 30 && isBeforeForecast) {
      return [
        ...acc,
        formatHour(
          weather,
          weatherTime.subtract(60 - requestedMinute, 'minute').format()
        ),
      ];
    }
    return acc;
  }, []);

const findDailyForecasts = (
  weatherData,
  [requestedHour, requestedMinute],
  lastHourlyDate
) =>
  weatherData.reduce((acc, forecast) => {
    const forecastDate = dayjs.utc(forecast.dt * 1000);
    if (lastHourlyDate.isBefore(forecastDate, 'day')) {
      return [
        ...acc,
        formatDay(
          forecast,
          forecastDate.hour(requestedHour).minute(requestedMinute).format()
        ),
      ];
    }

    return acc;
  }, []);

module.exports = {
  findClosestHourlyForecasts,
  findDailyForecasts,
};
