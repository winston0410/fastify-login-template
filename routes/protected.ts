import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from 'fastify';
import isLoggedIn from 'guards/isLoggedIn'
import isOwner from 'guards/isOwner'
import userController from 'controllers/UserController'
import bodySchema from 'schemas/users'

async function routes (fastify: FastifyInstance, options : FastifyPluginOptions) {
  fastify.decorateRequest('user', {})

  fastify.addHook('preHandler', isLoggedIn)

  fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.compress({ protected: 'this is the protected content' })
  })

  fastify.addHook('preHandler', isOwner)

  fastify.delete('/users/:id', userController.deleteUser)
  fastify.put('/users/:id', { schema: bodySchema }, userController.updateUser)
}

export default routes
