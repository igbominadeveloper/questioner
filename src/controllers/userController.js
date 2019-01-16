import helper from '../helpers/helper';
import user from '../models/user';

class userController {
	static login(request, response) {
		user.authenticate(request.body)
		.then(result => {
			if(result.rowCount > 0){
				const user = result.rows[0];

				if (helper.decodePassword(user.password,request.body.password)){
					const token = helper.generateToken(user.id,user.isadmin)
					const data = { token, user };	
					delete user.isadmin;
		      delete user.othername;
		      delete user.phonenumber;
		      delete user.password;
		      delete user.created_at;
		      delete user.updated_at;
					return response.status(200).json({
						status: 200,
						data: [data]
					})
				}
				return response.status(400).json({
					status: 400,
					error: `Incorrect password`
				})
			}
			return response.status(404).json({
				status: 404,
				error: `User not found`
			})
		})
		.catch(error => {
			return response.status(400).json({
				status: 403,
				error: error.message
			})
		})
}
	static register(request, response){
		user.register(request.body)
		.then(result => {
			const {token,user} = result;
			delete user.isadmin;
      delete user.othername;
      delete user.phonenumber;
      delete user.password;
      delete user.created_at;
      delete user.updated_at;
			return response.status(201).json({
				status: 201,
				data: [result]
			})
		})
	}
}

export default userController;