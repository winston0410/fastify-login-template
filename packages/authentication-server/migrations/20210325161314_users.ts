import { Knex } from "knex";

exports.up = async function (knex: Knex) {
    const hasTable = await knex.schema.hasTable('users');
    if(!hasTable){
        return await knex.schema.createTable('users',(table)=>{
                table.increments();
                table.string('username');
                table.string('password');
                table.timestamps(false,true);
        });
    }else{
        return Promise.resolve();
    }
};

exports.down = function (knex: Knex) {
    return knex.schema.dropTable('users')
};
