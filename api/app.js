'use strict';
require('dotenv').config();
const path = require('path');
const AutoLoad = require('fastify-autoload');
const fastifyStatic = require('fastify-static');
const GQL = require('fastify-gql');

const schema = require('./graphql');

module.exports = (fastify, opts, next) => {
  // Serve Frontend files
  fastify.register(fastifyStatic, {
    root: path.resolve(__dirname, '../frontend/dist'),
  });

  fastify.register(GQL, {
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
  });

  // Autoload various cross-cutting plugins like auth etc.
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  next();
};
