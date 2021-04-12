import { FastifyRequest, FastifyReply }from 'fastify';
import userService from 'services/UserService'
import jwtSimple from 'jwt-simple'
import jwt from 'loaders/jwt'
import { hashPassword, checkPassword } from 'hash'
import User from 'models/User'

type RequestWithCredential = FastifyRequest<{
  Body: {
    username: string,
    password: string
  }
}>

interface RequestWithUser extends RequestWithCredential {
  user: User
}

const login = async (request: RequestWithCredential, reply: FastifyReply) => {
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

const deleteUser = async(request: RequestWithUser, reply: FastifyReply) => {
  await userService.deleteUser(request.user.id)
  reply.code(204)
}

const updateUser = async(request: RequestWithUser, reply: FastifyReply) => {
  const { username, password } = request.body

  const updatedUser = await userService.updateUser(request.user.id, username, await hashPassword(password))

  const payload = {
      id: updatedUser.id,
      username: updatedUser.username
  };

  const token = jwtSimple.encode(payload, jwt.jwtSecret);

  reply
  .code(200)
  .send({
    username: updatedUser.username,
    token: token
  })
}

const userController = {
  login,
  register,
  deleteUser,
  updateUser
}

export default userController
