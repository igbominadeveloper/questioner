'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _queryFactory = require('../../database/queryFactory');

var _queryFactory2 = _interopRequireDefault(_queryFactory);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = function () {
  function User() {
    (0, _classCallCheck3.default)(this, User);
  }

  (0, _createClass3.default)(User, null, [{
    key: 'authenticate',
    value: function authenticate(credentials) {
      var statement = 'SELECT * FROM users where email = $1';
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [credentials.email]).then(function (result) {
          return resolve(result);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'register',
    value: function register(credentials) {
      var statement = 'INSERT INTO users(firstname,lastname,email,password) VALUES($1,$2,$3,$4) returning *';
      var passwordHash = _helper2.default.hashPassword(credentials.password);
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [credentials.firstname, credentials.lastname, credentials.email, passwordHash]).then(function (result) {
          var user = result.rows[0];
          var token = _helper2.default.generateToken(user.id, user.isadmin);
          resolve({ token: token, user: user });
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'giveAdmin',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(user_id) {
        var _ref2, rows, user;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _queryFactory2.default.run('UPDATE users SET isadmin = 1 WHERE id =$1 returning *', [user_id]);

              case 3:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (!rows[0]) {
                  _context.next = 14;
                  break;
                }

                user = (0, _assign2.default)({}, rows[0]);

                delete user.othername;
                delete user.username;
                delete user.password;
                delete user.created_at;
                delete user.updated_at;
                delete user.phonenumber;
                return _context.abrupt('return', user);

              case 14:
                return _context.abrupt('return', _promise2.default.reject({ status: 404, message: 'User doesn\'t exist' }));

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _context.t0);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 17]]);
      }));

      function giveAdmin(_x) {
        return _ref.apply(this, arguments);
      }

      return giveAdmin;
    }()
  }]);
  return User;
}();

exports.default = User;