import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL || 'postgres://favour@127.0.0.1:5432/questioner'
});

class QueryBuilder {
	run(statement, parameters = ''){
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