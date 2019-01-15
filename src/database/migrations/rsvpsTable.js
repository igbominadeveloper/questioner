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
      rsvps(
        id SERIAL PRIMARY KEY,
        userId INT NOT NULL,
        meetupId INT NOT NULL,
        response VARCHAR(128) NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`;
}

const down () => {
  const statement = `DROP TABLE IF EXISTS rsvps returning *`;
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