import dotenv from 'dotenv';
dotenv.config();
import fastify from 'fastify';
import {
  isLoggedIn
} from './guards'

const app = fastify({
  logger: true
})

app.register(import('./routes/index'))
app.register(isLoggedIn)
//Protected routes
app.register(import('./routes/protected'))

// Run the server!
app.listen(8080, function (err, address) {
  // if (err) {
  //   app.log.error(err)
  //   process.exit(1)
  // }
  app.log.info(`server listening on ${address}`)
})

export default app;
