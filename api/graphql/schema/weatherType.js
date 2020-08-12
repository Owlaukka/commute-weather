const typeDefs = `
  type WeatherData {
    time: Datetime!
    temperature: Float!
    weather: [String!]!
    humidity: Float!
  }

  type Query {
    weather(lat: Float!, lon: Float!, time: Datetime!, numberOfForecasts: Int): [WeatherData!]!
  }
`;

module.exports = typeDefs;
