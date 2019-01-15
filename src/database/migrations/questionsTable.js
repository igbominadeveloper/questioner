const { Pool } = require('pg');
const dotenv  = require('dotenv');
const dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const up = () => {
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
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`;
}

const down () => {
  const statement = `DROP TABLE IF EXISTS questions returning *`;
  pool.run(statement)
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
  up,
  down
}