import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

const fastifyInstance = fastify();

const pathToReact = path.resolve(
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

const start = async () => {
  try {
    await fastifyInstance.listen(3000);
  } catch (err) {
    fastifyInstance.log.error(err);
    process.exit(1);
  }
};

start();
