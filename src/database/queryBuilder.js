import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

dotenv.config();

const pool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT
});

// pool.on('connect', () => {
//   console.log('connected to the db');
// });

class QueryBuilder {
	static run(statement, parameters = ''){
		return new Promise((resolve, reject) => {
			pool.query(statement)
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