import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import queryFactory from '../../database/queryFactory';


/**
 * initialize dotenv config
 *
 * @instance dotenv.config
 */

dotenv.config();

/**
 * helper method for API error response
 *
 * @constant errorResponse
 * 
 * @param {Object} response
 * @param {Object} error
 * @return {JSON} response
 */

const errorResponse = (response, error) => {
  switch (error.status) {
    case 404: return response.status(404).json({
      status: 404,
      error: error.error ? error.error : 'Model Not Found',
    });

    case 422: return response.status(422).json({
      status: 422,
      error: error.error ? error.error : 'Unproccessable Entity',
    });
    case 400: return response.status(400).json({
      status: 400,
      error: error.error,
    });
    case 403: return response.status(403).json({
      status: 403,
      error: error.error || 'Forbidden',
    });
    case 401: return response.status(401).json({
      status: 401,
      error: error.error || 'Unauthorized',
    });
    case 409: return response.status(409).json({
      status: 409,
      error: error.error || 'Conflict',
    });
    default: return response.status(400).json({
      status: 400,
      error: error.error,
    });
  }
};

/**
 * helper method for Javascript current datetime
 *
 * @constant now
 */

const now = () => new Date().toLocaleString();


/**
 * helper method for hashing password
 * 
 * @constant hashPassword
 * 
 * @param {String} password
 * @return md5 hash
 */

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


/**
 * helper method for decoding password
 *
 * @constant decodePassword
 *
 * @param {String} passwordHash
 * @param {String} password
 * @return {String} password
 */

const decodePassword = (passwordHash, password) => bcrypt.compareSync(password, passwordHash);

/**
 * helper method for generating a jwt 
 *
 * @constant generateToken
 *
 * @param {String} user_id
 * @param {String} isadmin
 * @return {String} token
 */

const generateToken = (user_id, isadmin) => {
  const token = jwt.sign({
    user_id, isadmin,
  },
  process.env.SECRET_KEY, { expiresIn: '30d' });
  return token;
};

/**
 * helper middleware for checking email existence
 * 
 * @async @constant checkEmailDuplication
 * @param {Object} request
 * @param {response} response
 * @param {method} next
 * @return {Object} next, response or error
 */

const checkEmailDuplication = async (request, response, next) => {
  const { email } = request.body;
  queryFactory.run('SELECT * FROM users WHERE email=$1', [email])
    .then((result) => {
      if (result.rowCount > 0) {
        return response.status(400).json({
          status: 400,
          error: 'Email is registered already',
        });
      }
      next();
    })
    .catch(error => errorResponse(response, { status: error.status, message: error.error }));
};

/**
 * export a helper Object with various methods
 * 
 * @exports {Object} helper
 */

export default {
  errorResponse,
  now,
  hashPassword,
  decodePassword,
  checkEmailDuplication,
  generateToken,
};
