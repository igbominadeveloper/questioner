import QueryBuilder from '../database/queryBuilder';
import helper from '../helpers/helper';

class User {
	static authenticate(credentials){
		const statement = `SELECT * FROM users where email = $1`;
		return new Promise((resolve,reject) => {
			QueryBuilder.run(statement,[credentials.email])
			.then(result => resolve(result))
			.catch(error => reject(error))			
		})
	}
}

export default User;