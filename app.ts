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

// Run the server!
app.listen(8080, function (err, address) {
  if (err) {
    //@ts-ignore
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening on ${address}`)
})

export default app;
