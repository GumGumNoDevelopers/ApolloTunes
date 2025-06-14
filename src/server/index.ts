import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import apiRoutes from './routes/api';

const fastify = Fastify({ logger: true });

// Register API routes
fastify.register(apiRoutes);

require('dotenv').config();

// Serve static files from the client build
fastify.register(fastifyStatic, {
  root: require('path').join(__dirname, '../../public'),
  prefix: '/', // optional: default '/'
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();