const got = require('got');

const API_KEY = process.env.WEATHER_API_KEY;

// prevents the sending of actual external API-calls in e2e-tests.
// Instead returns canned responses from Wiremock
const WEATHER_API_DOMAIN =
  process.env.NODE_ENV !== 'test'
    ? 'https://api.openweathermap.org'
    : 'http://localhost:9999';

// TODO: move to helpers somewhere
const parseJSON = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('Could not parse JSON. JSON:', json, 'Error:', e);
  }
};

const fetchWeatherByLocation = async (lat, lon) => {
  try {
    const response = await got(
      `${WEATHER_API_DOMAIN}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current&appid=${API_KEY}&units=metric`
    );
    return parseJSON(response.body);
  } catch (e) {
    console.error('Could not fetch weather from external weather API', e);
  }
};

module.exports = { fetchWeatherByLocation };
