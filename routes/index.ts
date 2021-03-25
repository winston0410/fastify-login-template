async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world2' }
  })

  fastify.post('/login', async (req, res) => {
    const { username, password } = req.body
    return { hello: 'login route' }
  })
}

export default routes
