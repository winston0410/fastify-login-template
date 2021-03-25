async function routes (fastify, options) {
  fastify.get('/users', async (request, reply) => {
    return { protected: true }
  })
}

export default routes
