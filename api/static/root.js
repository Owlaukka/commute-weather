module.exports = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    reply.sendFile('index.html');
  });
};
