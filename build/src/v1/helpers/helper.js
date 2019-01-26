'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _queryFactory = require('../../database/queryFactory');

var _queryFactory2 = _interopRequireDefault(_queryFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var errorResponse = function errorResponse(response, error) {
  switch (error.status) {
    case 404:
      return response.status(404).json({
        status: 404,
        error: error.error ? error.error : 'Model Not Found'
      });

    case 422:
      return response.status(422).json({
        status: 422,
        error: error.error ? error.error : 'Unproccessable Entity'
      });
    case 400:
      return response.status(400).json({
        status: 400,
        error: error.error
      });
    case 403:
      return response.status(403).json({
        status: 403,
        error: error.error || 'Forbidden'
      });
    case 401:
      return response.status(401).json({
        status: 401,
        error: error.error || 'Unauthorized'
      });
    case 409:
      return response.status(409).json({
        status: 409,
        error: error.error || 'Conflict'
      });
    default:
      return response.status(400).json({
        status: 400,
        error: error.error
      });
  }
};

var now = function now() {
  return new Date().toLocaleString();
};

var hashPassword = function hashPassword(password) {
  return _bcryptjs2.default.hashSync(password, _bcryptjs2.default.genSaltSync(10));
};

var decodePassword = function decodePassword(passwordHash, password) {
  return _bcryptjs2.default.compareSync(password, passwordHash);
};

var generateToken = function generateToken(user_id, isadmin) {
  var token = _jsonwebtoken2.default.sign({
    user_id: user_id, isadmin: isadmin
  }, process.env.SECRET_KEY, { expiresIn: '30d' });
  return token;
};

var checkEmailDuplication = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response, next) {
    var email;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = request.body.email;

            _queryFactory2.default.run('SELECT * FROM users WHERE email=$1', [email]).then(function (result) {
              if (result.rowCount > 0) {
                return response.status(400).json({
                  status: 400,
                  error: 'Email is registered already'
                });
              }
              next();
            }).catch(function (error) {
              return errorResponse(response, { status: error.status, message: error.error });
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function checkEmailDuplication(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = {
  errorResponse: errorResponse,
  now: now,
  hashPassword: hashPassword,
  decodePassword: decodePassword,
  checkEmailDuplication: checkEmailDuplication,
  generateToken: generateToken
};