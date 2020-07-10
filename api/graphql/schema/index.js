const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type WeatherData {
    lat: Float!
    lon: Float!
    time: String!
    temperature: Float!
    weather: [String!]!
    humidity: Float!
  }

  type RootQuery {
    weather(lat: Float!, lon: Float!, times: [String]): [WeatherData!]
  }

  schema {
    query: RootQuery
  }
`);

module.exports = schema;
