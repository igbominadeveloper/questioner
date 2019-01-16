import helper from '../helpers/helper';
import user from '../models/user';

class userController {
	static login(request, response) {
		user.authenticate(request.body)
		.then(result => {
			return response.status(200).json({
				status: 200,
				data: [result.token,result.user]
			});
		})
	}
}