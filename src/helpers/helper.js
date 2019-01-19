import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import QueryBuilder from '../database/queryBuilder';

dotenv.config();

const checkErrorCode = (response, error) => {
  switch (error.status) {
    case 404: return response.status(404).json({
      status: 404,
      error: error.message ? error.message : 'Model Not Found',
    });
      break;

    case 422: return response.status(422).json({
      status: 422,
      error: error.message ? error.message : 'Unproccessable Entity',
    });
      break;
    case 400: return response.status(400).json({
      status: 400,
      error: error.message,
    });
      break;
    case 403: return response.status(403).json({
      status: 403,
      error: error.message || 'Forbidden',
    });
      break;
    case 401: return response.status(401).json({
      status: 401,
      error: error.message || 'Unauthorized',
    });
      break;
    default: return response.status(400).json({
      status: 400,
      error: error.message,
    });
  }
};

const now = () => new Date().toLocaleString();


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const decodePassword = (hashPassword, password) => bcrypt.compareSync(password, hashPassword);

const generateToken = (user_id, isadmin) => {
  const token = jwt.sign({
    user_id, isadmin,
  },
  process.env.SECRET_KEY, { expiresIn: '5d' });
  return token;
};

const checkEmailDuplication = async (request, response, next) => {
  const email = request.body.email;
  QueryBuilder.run('SELECT * FROM users WHERE email=$1', [email])
    .then((result) => {
      if (result.rowCount > 0) {
        return response.status(400).json({
          status: 400,
          error: 'Email is registered already',
        });
      }
      next();
    })
    .catch(error => console.log(error));
};

export default {
  checkErrorCode,
  now,
  hashPassword,
  decodePassword,
  checkEmailDuplication,
  generateToken,
};
