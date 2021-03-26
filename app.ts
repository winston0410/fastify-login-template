import dotenv from 'dotenv';
dotenv.config();
import fastify, { FastifyRequest, FastifyReply, FastifyInstance, HookHandlerDoneFunction } from 'fastify';

const app: FastifyInstance = fastify({
  logger: true
})

// app.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
//   const { accept } = request.headers
//   done()
// })

app.register(import('./routes/index'))
app.register(import('./routes/protected'))

export default app;
