const { Pool } = require('pg');
const dotenv  = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createRsvpsTable = () => {
  const statement =
    `CREATE TABLE IF NOT EXISTS
      rsvps(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        meetupId INT NOT NULL,
        response VARCHAR(128) NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (meetupId) REFERENCES meetups (id) ON DELETE CASCADE
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

const dropRsvpsTable = () => {
  const statement = `DROP TABLE IF EXISTS rsvps`;
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
  createRsvpsTable,
  dropRsvpsTable
}

require('make-runnable');