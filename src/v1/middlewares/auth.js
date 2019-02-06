import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import queryFactory from '../../database/queryFactory';


import helper from '../helpers/helper';

/**
 * implement the dotenv interface and call the config method
 * 
 * @implements dotenv
 * @method config
*/

dotenv.config();

/**
 * set jwt secret key
 * 
 * @constant process.env.SECRET_KEY
 */

const JWT_SECRET = process.env.SECRET_KEY;

class Auth {
/**
 *----------------------------------
 * Class Auth 
 *----------------------------------
 *
 * This class is responsible handling 
 * authentication and authorization
 * throughout the application 
*/

  /**
   * verify a user token 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
  */

  static async verifyToken(request, response, next) {
    const token = request.headers['x-access-token'];
    if (!token) {
      return helper.errorResponse(response, { status: 401, error: 'Token not set' });
    }
    try {
      const decodedToken = await jwt.verify(token, JWT_SECRET);
      const statement = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await queryFactory.run(statement, [decodedToken.user_id]);
      if (!rows[0]) {
        return helper.errorResponse(response, { status: 422, error: 'Invalid Token provided' });
      }
      request.user = { id: decodedToken.user_id, isadmin: decodedToken.isadmin };
      next();
    } catch (error) {
      return helper.errorResponse(response, { status: 400, error: error.message });
    }
  }
}

export default Auth;
