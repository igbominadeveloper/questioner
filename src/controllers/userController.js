import helper from '../helpers/helper';
import user from '../models/user';

class userController {
	static login(request, response) {
		user.authenticate(request.body)
		.then(result => {
			if(result.rowCount > 0){
			return response.status(200).json({
				status: 200,
				data: {
					user: result.rows[0],
					token: '673678387873873hhjhjheyyfgdhyg'
				}
			});
		}
		return response.status(404).json({
			status: 404,
			error: `User doesn't exist`
		})
		})
		.catch(error => {
			return response.status(404).json({
				status: 404,
				error: error.message
			})
		})
	}
}

export default userController;