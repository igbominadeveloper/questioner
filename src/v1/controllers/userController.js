import helper from '../helpers/helper';
import user from '../models/user';
import QueryFactory from '../../database/queryFactory';

class userController {
  static login(request, response) {
    user.authenticate(request.body)
      .then((result) => {
        if (result.rowCount > 0) {
          const user = result.rows[0];

          if (helper.decodePassword(user.password, request.body.password)) {
            const token = helper.generateToken(user.id, user.isadmin);
            const data = { token, user };
		      delete user.othername;
            delete user.phonenumber;
		      delete user.username;
		      delete user.password;
		      delete user.created_at;
		      delete user.updated_at;
            return response.status(200).json({
              status: 200,
              data: [data],
            });
          }
          return response.status(400).json({
            status: 400,
            error: 'Incorrect password',
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'User not found',
        });
      })
      .catch(error => response.status(400).json({
        status: 401,
        error: error.error,
      }));
  }

  static register(request, response) {
    user.register(request.body)
      .then((result) => {
        const { token, user } = result;
        delete user.isadmin;
        delete user.othername;
        delete user.phonenumber;
        delete user.username;
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        return response.status(201).json({
          status: 201,
          data: [result],
        });
      });
  }

  static async admin(request, response) {
    try {
      const result = await user.giveAdmin(request.user.id);
      if (result) {
        return response.status(200).json({
          status: 200,
          data: [result],
        });
      }
    } catch (error) {
      return helper.errorResponse(response, error);
    }
  }

  static async update(request, response) {
    try {
      const { rows } = await user.find(request.params.id);
      if (rows.length > 0) {
        const updatedProfile = await user.update(rows[0], request.body);
        const result = Object.assign({}, updatedProfile.rows[0]);
        delete result.isadmin;
        delete result.password;
        delete result.created_at;
        return response.status(200).json({
          status: 200,
          data: result
        });
      }
      return helper.errorResponse(response, { status: 404, error:'User does not exist' });        
    } catch (error) {
        return helper.errorResponse(response, { status: error.status, error: error });
    }
  }
}

export default userController;
