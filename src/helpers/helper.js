import bcrypt from 'bcryptjs';

const checkErrorCode = (response, error) => {
  switch (error.status) {
    case 404: return response.status(404).json({
      status: 404,
      error: "Model doesn't exist"
    });
    break; 
    case 400: return response.status(400).json({
      status: 400,
      error: error.message
    });
    break; 
    case 403: return response.status(403).json({
      status: 403,
      error: error.message
    });
    break;
    case 401: return response.status(401).json({
      status: 401,
      error: error.message
    });
    break;
    default: return response.status(400).json({
      status: 400,
      error: error.message
    });
  }
}

const now = () => new Date().toLocaleString();

const hashPassword(password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export default {
  checkErrorCode,
  now,
  hashPassword
};
