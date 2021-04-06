import { FastifyRequest, FastifyReply, HookHandlerDoneFunction }from 'fastify';
import User from 'models/User'

const targetMethods = 'PUT' || 'DELETE' || 'PATCH'

async function isOwner(request: FastifyRequest<{
  Params: {
    id: number
  }
}>, reply:FastifyReply, done: HookHandlerDoneFunction): Promise<void> {
  //@ts-ignore
  const { user, method } = request
  const { id } = request.params

  if(method !== targetMethods){
    return done()
  }

  if(id !== user.id){
    return reply.code(403).send({
      message: 'Only owner of this resource can make modification.'
    })
  }

  done()
}

export default isOwner
