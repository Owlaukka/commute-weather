require('dotenv').config();
const path = require('path');
const cors = require('fastify-cors');
const GQL = require('fastify-gql');

const schema = require('./graphql');

module.exports = (fastify, opts, next) => {
  fastify.register(cors, { origin: true });

  fastify.register(GQL, {
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
  });

  // Testing only routes
  if (process.env.NODE_ENV === 'test') {
    // Serve Frontend files in testing
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    fastify.register(require('fastify-static'), {
      root: path.resolve(__dirname, '../frontend/dist'),
    });

    // Used in tests and CI to detect by wait-on library that the server is up and pipeline can continue
    fastify.head('/', async (request, reply) => {
      reply.send({ test: 1 });
    });
  }

  next();
};
