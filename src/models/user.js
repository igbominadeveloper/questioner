import QueryBuilder from '../database/queryBuilder';
import helper from '../helpers/helper';

class User {
	static authenticate(email, password){
		const statement = `SELECT * FROM users where email = $1`;
		return new Promise((resolve,reject) => {
			QueryBuilder.run(statement,[email])
			.then(result => {
				const user = result.rows[0];
				const token = helper.generateToken(user.id);
				resolve(user, token);
			})
			.catch(error => reject(error))			
		})
	}
}