const { Pool } = require('pg');
const dotenv  = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createCommentsTable = () => {
  const statement =
    `CREATE TABLE IF NOT EXISTS
      comments(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        questionId INT NOT NULL,
        title VARCHAR(128) NOT NULL,
        body VARCHAR(128) NOT NULL,
        comments VARCHAR(128) DEFAULT 0,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (questionId) REFERENCES questions (id) ON DELETE CASCADE
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

const dropCommentsTable = () => {
  const statement = `DROP TABLE IF EXISTS comments`;
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
  createCommentsTable,
  dropCommentsTable
}

require('make-runnable');