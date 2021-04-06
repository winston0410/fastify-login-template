import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions }from 'fastify';
import userController from 'controllers/UserController'
import bodySchema from 'schemas/users'

async function routes (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.compress({ hello: 'world2' })
  })

  fastify.post('/login', {
    schema: bodySchema
  }, userController.login)

  fastify.post('/register', { schema: bodySchema }, userController.register)
}

export default routes
