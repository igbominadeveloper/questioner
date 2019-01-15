const { Pool } = require('pg');
const dotenv  = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUsersTable = () => {
  const statement =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othername VARCHAR(128),
        username VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        phoneNumber VARCHAR(128),
        isAdmin INT NOT NULL DEFAULT 0,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
      pool.query(statement)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
}

const dropUsersTable = () => {
  const statement = `DROP TABLE IF EXISTS users`;
  pool.query(statement)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
}

module.exports = {
  createUsersTable,
  dropUsersTable
}

require('make-runnable');