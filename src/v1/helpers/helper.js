import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import queryFactory from '../../database/queryFactory';



dotenv.config();

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

const now = () => new Date().toLocaleString();


const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const decodePassword = (passwordHash, password) => bcrypt.compareSync(password, passwordHash);

const generateToken = (user_id, isadmin) => {
  const token = jwt.sign({
    user_id, isadmin,
  },
  process.env.SECRET_KEY, { expiresIn: '30d' });
  return token;
};

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

export default {
  errorResponse,
  now,
  hashPassword,
  decodePassword,
  checkEmailDuplication,
  generateToken,
};