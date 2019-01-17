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

	static register(credentials) {
		const statement = `INSERT INTO users(firstname,lastname,othername,username,email,password) VALUES($1,$2,$3,$4,$5,$6) returning *`;
		const passwordHash = helper.hashPassword(credentials.password);
		return new Promise((resolve, reject) => {	
			QueryBuilder.run(statement,[credentials.firstname,credentials.lastname,credentials.othername,credentials.username,credentials.email,passwordHash])
			.then(result => {
				const user = result.rows[0];
				const token = helper.generateToken(user.id,user.isadmin);

				resolve({token,user})
			})
			.catch(error => reject(error))
		})
	}
}

export default User;