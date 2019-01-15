const { Pool } = require('pg');
const dotenv  = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createQuestionsTable = () => {
  const statement =
    `CREATE TABLE IF NOT EXISTS
      questions(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        meetupId INT NOT NULL,
        title VARCHAR(128) NOT NULL,
        body VARCHAR(128) NOT NULL,
        upvotes INT DEFAULT 0,
        downvotes INT DEFAULT 0,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (meetupId) REFERENCES meetups (id) ON DELETE CASCADE
      )`;
      pool.query(statement)
      .then(res => {
        console.log(res);
        pool.end();
      })
      .catch(err => {
        console.log(err);
        pool.end();
      });
}

const dropQuestionsTable = () => {
  const statement = `DROP TABLE IF EXISTS questions`;
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
  createQuestionsTable,
  dropQuestionsTable
}

require('make-runnable');