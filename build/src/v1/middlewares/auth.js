'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _queryFactory = require('../../database/queryFactory');

var _queryFactory2 = _interopRequireDefault(_queryFactory);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var JWT_SECRET = process.env.SECRET_KEY;

var Auth = function () {
  function Auth() {
    (0, _classCallCheck3.default)(this, Auth);
  }

  (0, _createClass3.default)(Auth, null, [{
    key: 'verifyToken',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response, next) {
        var token, decodedToken, statement, _ref2, rows;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = request.headers['x-access-token'];

                if (token) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', _helper2.default.errorResponse(response, { status: 401, error: 'Token not set' }));

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return _jsonwebtoken2.default.verify(token, JWT_SECRET);

              case 6:
                decodedToken = _context.sent;
                statement = 'SELECT * FROM users WHERE id = $1';
                _context.next = 10;
                return _queryFactory2.default.run(statement, [decodedToken.user_id]);

              case 10:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', _helper2.default.errorResponse(response, { status: 422, error: 'Invalid Token provided' }));

              case 14:
                request.user = { id: decodedToken.user_id, isadmin: decodedToken.isadmin };
                next();
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](3);
                return _context.abrupt('return', _helper2.default.errorResponse(response, { status: 400, error: _context.t0 }));

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 18]]);
      }));

      function verifyToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);
  return Auth;
}();

exports.default = Auth;