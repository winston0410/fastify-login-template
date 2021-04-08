import dotenv from 'dotenv';
dotenv.config();
import fastify, { FastifyRequest, FastifyReply, FastifyInstance, HookHandlerDoneFunction, RouteOptions } from 'fastify';

const app: FastifyInstance = fastify({
  logger: true,
  http2: true,
  // https: {
  //   key: '',
  //   cert: ''
  // }
})

// app.setErrorHandler(function (error, request, reply) {
//
//   console.log('check error from Error Handler', error)
//
//   if (error.validation) {
//     return reply.send({
//       message: 'captured by error handler'
//     })
//   }
// })

app.register(import("fastify-etag"))
app.register(import('fastify-compress'), { threshold: 1024 })
app.register(import('better-fastify-405'), {
  routes: [
    import('./routes/index'),
    import('./routes/protected')
  ]
})

export default app;
