import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pool;

if (process.env.NODE_ENV == 'test') {
  pool = new Pool({
    connectionString: process.env.TEST_DATABASE_URL,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
}

pool.on('connect', (response, error) => {
  let config = response.connectionParameters;
  console.log(`Connected to ${config.database} at ${config.host} in ${process.env.NODE_ENV} mode`);
});

class QueryFactory {
  static run(statement, parameters = '') {
    return new Promise((resolve, reject) => {
      pool.query(statement, parameters)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default QueryFactory;
