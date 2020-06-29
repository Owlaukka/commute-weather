const got = require('got');

const weatherResolver = {
  oneCity: async ({ city }, req) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await got(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    console.log(response.body);
    return 3;
  },
  add: async ({ x, y }) => x + y,
};

module.exports = weatherResolver;
