const got = require('got');

const weatherResolver = {
  oneCity: async ({ lat, lon }, req) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await got(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`
    );
    console.log(response.body);
    return 3;
  },
  add: async ({ x, y }) => x + y,
  weather: async ({ lat, lon, time }) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await got(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`
    );
    const data = JSON.parse(response.body);
    console.log('==================');
    console.log(
      data.hourly.map((hour) => `${new Date(hour.dt * 1000)}: ${hour.temp}`)
    );
    const requestedTime = new Date(time);
    const currentTime = new Date(Date.now());

    console.log('requestedTime', requestedTime);
    const weatherData = {
      lat: lat,
      lon: lon,
      time: new Date(data.current.dt * 1000).toISOString(),
      temperature: data.current.temp,
      weather: data.current.weather.map((weather) => weather.main).join(', '),
      humidity: data.current.humidity,
    };
    return weatherData;
  },
};

module.exports = weatherResolver;
