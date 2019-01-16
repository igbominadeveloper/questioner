import QueryBuilder from '../database/queryBuilder';
import helper from '../helpers/helper';

class User {
	static login(email, password){
		const statement = `SELECT * FROM users where email = $1`;
		return new Promise((resolve,reject) => {
			QueryBuilder.run(statement,[email])
			.then(result => {
				const token = helper.generateToken(result.rows[0].id);
				resolve(token);
			})
			.catch(error => reject(error))			
		})
	}
}