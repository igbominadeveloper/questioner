import helper from '../helpers/helper';
import user from '../models/user';

class userController {
/**
 * ---------------------------------------
 * userController 
 * ---------------------------------------
 * 
 * This controller is responsible for
 * handling every auth request and
 * requests to the /user route
 */

 /**
  * fetch all users
  * 
  * @param {Object} request 
  * @param {Object} response 
  */
  static async index(request, response) {
    if(! request.user.isadmin) {
      return helper.errorResponse(response, { status: 401 });
    }
    try {
      const { rows } = await user.all();
      if(rows.length > 0) {
        return response.status(200).json({
          status: 200,
          data: [rows]
        })
      }
    } catch (error) {
      return helper.errorResponse(response, { status: 404 });
    }
  }

  /**
   * create new token for existing user
   * 
   * @param {Object} request 
   * @param {Object} response
   * @return {Array} user and token
   */

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
            error: 'Incorrect credentials',
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'Incorrect credentials',
        });
      })
      .catch(error => response.status(400).json({
        status: 400,
        error,
      }));
  }

  /**
   * register a new user and assign token
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @return {Array} user and token
   */

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

  /**
   * Assign admin role to a user
   * 
   * @param {Object} request 
   * @param {Object} response
   * @return {Object} update resource 
   */
  
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
  
  /**
   * Find a user
   * 
   * @param {Object} request 
   * @param {Objeect} response 
   */

  static async find(request, response) {
    let id;
    id = request.user.isadmin ? request.params.id : request.user.id;
    try {
      const { rows } = await user.find(id);
      if (rows.length > 0) {
        const result = Object.assign({}, rows[0]);
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

  /**
   * 
   * update the details of a user
   * 
   * @param {Object} request 
   * @param {Object} response 
   */  

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
