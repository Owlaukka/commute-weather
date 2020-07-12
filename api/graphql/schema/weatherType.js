const typeDefs = `
  type WeatherData {
    lat: Float!
    lon: Float!
    time: Datetime!
    temperature: Float!
    weather: [String!]!
    humidity: Float!
  }

  type Query {
    weather(lat: Float!, lon: Float!, times: [Datetime!]!): [WeatherData!]!
  }
`;

module.exports = typeDefs;
