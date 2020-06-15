import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

const fastifyInstance = fastify();

const pathToReact = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../frontend/dist'
);

fastifyInstance.register(fastifyStatic, {
  root: pathToReact,
});

// Serve front-end React bundle
fastifyInstance.get('/', async (request, reply) => {
  reply.sendFile('index.html');
});

fastifyInstance.get('/hello', async () => ({ hello: 'world' }));

// Start the server on port 3000
(async () => {
  try {
    await fastifyInstance.listen(3000);
  } catch (err) {
    fastifyInstance.log.error(err);
    process.exit(1);
  }
})();
