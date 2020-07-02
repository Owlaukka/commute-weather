const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type WeatherData {
    lat: Float!
    lon: Float!
    time: String!
    temperature: Float!
    weather: String!
    humidity: Float!
  }

  type RootQuery {
    add(x: Int!, y: Int!): Int
    oneLocation(lat: Int!, lon: Int!): Int
    weather(lat: Float!, lon: Float!, time: String): WeatherData!
  }

  schema {
    query: RootQuery
  }
`);

module.exports = schema;
