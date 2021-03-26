import knex from 'loaders/knex'

const userService = {
  getUser: function (username: string){
    return knex.select("*").from('users').where('username',username);
  }
}

export default userService
