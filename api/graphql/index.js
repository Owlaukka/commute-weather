/* eslint-disable import/no-extraneous-dependencies */
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const { scalarTypeDeclarations, customScalars } = require('./customScalars');

const types = [scalarTypeDeclarations, typeDefs];

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(types),
  resolvers: [customScalars, ...resolvers],
});

module.exports = schema;
