const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type RootQuery {
    add(x: Int!, y: Int!): Int
    oneCity(city: String!): Int
  }

  schema {
    query: RootQuery
  }
`);

module.exports = schema;
