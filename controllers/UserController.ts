import { FastifyRequest, FastifyReply }from 'fastify';
import userService from 'services/UserService'
import jwtSimple from 'jwt-simple'
import jwt from 'loaders/jwt'
import { checkPassword } from 'hash'

const userController = {
  login: async (request: FastifyRequest, reply: FastifyReply) => {

    //@ts-ignore
    const { username, password } = request.body

    if(!username || !password){
      reply.code(400).send({
        message: "Missing username or password"
      })
      return
    }

    const user = (await userService.getUser(username))[0];

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
}

export default userController
