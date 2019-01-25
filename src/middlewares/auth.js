import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import QueryBuilder from '../database/queryBuilder';
import helper from '../helpers/helper';

dotenv.config();
const JWT_SECRET = process.env.SECRET_KEY;

class Auth {
  static async verifyToken(request, response, next) {
    const token = request.headers['x-access-token'];
    if (!token) {
      return helper.errorResponse(response, { status: 401, error: 'Token not set' });
    }
    try {
      const decodedToken = await jwt.verify(token, JWT_SECRET);
      const statement = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await QueryBuilder.run(statement, [decodedToken.user_id]);
      if (!rows[0]) {
        return helper.errorResponse(response, { status: 422, error: 'Invalid Token provided' });
      }
      request.user = { id: decodedToken.user_id, isadmin: decodedToken.isadmin };
      next();
    } catch (error) {
      return helper.errorResponse(response, { status: 400, error });
    }
  }
}

export default Auth;
