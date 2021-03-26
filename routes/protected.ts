import { FastifyRequest, FastifyReply, FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  isLoggedIn
} from 'guards'

async function routes (fastify: FastifyInstance, options : FastifyPluginOptions) {
  fastify.decorateRequest('user', {})

  fastify.addHook('preHandler', isLoggedIn)

  fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    return { protected: 'this is the protected content' }
  })
}

export default routes
