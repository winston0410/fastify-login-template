import knex from 'loaders/knex'

const userService = {
  getUser: async function (username: string){
    return (await knex.select("*").from('users').where('username',username))[0]
  },
  createUser: async function (username: string, hashedPassword: string){
    return (await knex('users')
    .returning(['username', 'id'])
    .insert({
      username: username,
      password: hashedPassword
    }))[0]
  },
  deleteUser: async function (id: number){
    return (await knex('users').where('id', id).del())
  }
}

export default userService
