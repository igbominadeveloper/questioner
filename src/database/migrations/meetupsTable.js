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
      meetups(
        id SERIAL PRIMARY KEY,
        topic VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        date TIMESTAMP,
        images ARRAY,
        tags ARRAY,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`;
}

const down () => {
  const statement = `DROP TABLE IF EXISTS meetups returning *`;
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