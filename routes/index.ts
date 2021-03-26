import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions }from 'fastify';
import userController from 'controllers/UserController'

async function routes (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world2' }
  })

  fastify.post('/login', userController.login)
}

export default routes
