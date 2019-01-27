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

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _user2 = require('../models/user');

var _user3 = _interopRequireDefault(_user2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userController = function () {
  function userController() {
    (0, _classCallCheck3.default)(this, userController);
  }

  (0, _createClass3.default)(userController, null, [{
    key: 'login',
    value: function login(request, response) {
      _user3.default.authenticate(request.body).then(function (result) {
        if (result.rowCount > 0) {
          var _user = result.rows[0];

          if (_helper2.default.decodePassword(_user.password, request.body.password)) {
            var token = _helper2.default.generateToken(_user.id, _user.isadmin);
            var data = { token: token, user: _user };
            delete _user.othername;
            delete _user.phonenumber;
            delete _user.username;
            delete _user.password;
            delete _user.created_at;
            delete _user.updated_at;
            return response.status(200).json({
              status: 200,
              data: [data]
            });
          }
          return response.status(400).json({
            status: 400,
            error: 'Incorrect password'
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'User not found'
        });
      }).catch(function (error) {
        return response.status(400).json({
          status: 401,
          error: error.error
        });
      });
    }
  }, {
    key: 'register',
    value: function register(request, response) {
      _user3.default.register(request.body).then(function (result) {
        var token = result.token,
            user = result.user;

        delete user.isadmin;
        delete user.othername;
        delete user.phonenumber;
        delete user.username;
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        return response.status(201).json({
          status: 201,
          data: [result]
        });
      });
    }
  }, {
    key: 'admin',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _user3.default.giveAdmin(request.user.id);

              case 3:
                result = _context.sent;

                if (!result) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', response.status(200).json({
                  status: 200,
                  data: [result]
                }));

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _helper2.default.errorResponse(response, _context.t0));

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function admin(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return admin;
    }()
  }]);
  return userController;
}();

exports.default = userController;