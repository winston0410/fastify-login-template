import { Knex } from "knex";

exports.seed = async function (knex: Knex) {
    // Deletes ALL existing entries
    await knex('users').truncate();
    //Create your own user info with the following website
    // https://bcrypt-generator.com/
    // https://jwt.io/
    const users = [
        {
            username:"hugo@gmail.com",
            password:"$2y$10$BB4OxvICMGud1.YmGZ8QD.PnMJVNossEIJaL08owXI622t3nu73dq"
        }
    ]
    await knex.batchInsert('users',users);
};
