import { FastifyRequest, FastifyReply }from 'fastify';
import userService from 'services/UserService'
import jwtSimple from 'jwt-simple'
import jwt from 'loaders/jwt'
import { hashPassword, checkPassword } from 'hash'

type RequestWithCredential = FastifyRequest<{
  Body: {
    username: string,
    password: string
  }
}>

interface User {
  id: number,
  username: string,
  password: string
}

const login = async (request: RequestWithCredential, reply: FastifyReply) => {

  if(!request.body?.username || !request.body?.password){
    reply.code(400).send({
      message: "Missing username or password"
    })
    return
  }

  const { username, password } = request.body

  const user: User = await userService.getUser(username);

  if(!user || !(await checkPassword(password,user.password))){
      reply.code(401).send({message:"Wrong username or password"});
      return;
  }
  const payload = {
      id: user.id,
      username: user.username
  };

  const token = jwtSimple.encode(payload, jwt.jwtSecret);

  reply.send({
      token: token
  });
}

const register = async (request: RequestWithCredential, reply: FastifyReply) => {
  if(!request.body?.username || !request.body?.password){
    reply.code(400).send({
      message: "Missing username or password"
    })
    return
  }

  const { username, password } = request.body

  const existingUser = await userService.getUser(username);

  if(existingUser){
    reply.code(409).send({
      message: 'Username has been used.'
    })
    return
  }

  const user = (await userService.createUser(username, await hashPassword(password)))

  const payload = {
      //@ts-ignore
      id: user.id,
      //@ts-ignore
      username: user.username
  };

  const token = jwtSimple.encode(payload, jwt.jwtSecret);

  reply
  .code(201)
  .header('Location', 'location of that resource')
  .send({
    username,
    token
  })
}

const deleteAccount = async(request, reply: FastifyReply) => {
  if(request.params.id !== request.user.id){
    reply
    .code(403)
    .send({
      message: 'You can only delete your account.'
    })
  }
  await userService.deleteUser(request.user.id)
  reply.code(204)
}

const userController = {
  login,
  register,
  deleteAccount
}

export default userController
