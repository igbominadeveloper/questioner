import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

class QueryBuilder {
	static run(statement, parameters = ''){
		return new Promise((resolve, reject) => {
			pool.query(statement,parameters)
			.then(response => {
				resolve(response)
			})
			.catch(error => {
				reject(error)
			})
		})
	}
}

export default QueryBuilder;