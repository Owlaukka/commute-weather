'use strict';

require('dotenv').config();
const path = require('path');
const AutoLoad = require('fastify-autoload');
const fastifyStatic = require('fastify-static');
const GQL = require('fastify-gql');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

module.exports = function (fastify, opts, next) {
  // Serve Frontend files
  fastify.register(fastifyStatic, {
    root: path.resolve(__dirname, '../frontend/dist'),
  });

  fastify.register(GQL, {
    schema,
    resolvers,
    graphiql: true,
  });

  // Autoload various cross-cutting plugins like auth etc.
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  next();
};
