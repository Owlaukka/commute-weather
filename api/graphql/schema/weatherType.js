// TODO: add custom directive to make specific Temperature fields required based on isDaily value
const typeDefs = `
  type Temperature {
    isDaily: Boolean!
    temp: Float
    min: Float
    max: Float
  }

  type Weather {
    main: String!
    icon: String!
  }

  type WeatherData {
    time: Datetime!
    temperature: Temperature!
    weather: [Weather!]!
    humidity: Float!
  }

  type Query {
    weather(lat: Float!, lon: Float!, time: Time!, requestedAt: String!): [WeatherData!]!
  }
`;

module.exports = typeDefs;
