'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Meetup = require('../models/Meetup');

var _Meetup2 = _interopRequireDefault(_Meetup);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
var meetupController = function () {
  function meetupController() {
    (0, _classCallCheck3.default)(this, meetupController);
  }

  (0, _createClass3.default)(meetupController, null, [{
    key: 'index',

    /**
     * Fetches all available meetups
     * @params {object} request
     * @params {object} response
     * @return {Array} meetups
     */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response) {
        var _ref2, rows;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Meetup2.default.all();

              case 3:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (!(rows.length > 0)) {
                  _context.next = 8;
                  break;
                }

                rows.map(function (row) {
                  delete row.created_at;
                  delete row.updated_at;
                  delete row.images;
                });
                return _context.abrupt('return', response.status(200).json({
                  status: 200,
                  data: rows
                }));

              case 8:
                return _context.abrupt('return', response.status(404).json({
                  status: 404,
                  error: 'No Meetups available right now'
                }));

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', response.status(400).json({
                  status: 400,
                  error: _context.t0.error
                }));

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function index(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: 'show',
    value: function show(request, response) {
      _Meetup2.default.find(request.params.id).then(function (result) {
        if (result.rowCount > 0) {
          result.rows.map(function (row) {
            delete row.created_at;
            delete row.updated_at;
            delete row.images;
          });
          return response.status(200).json({
            status: 200,
            data: [result.rows[0]]
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'Meetup doesn\'t exist'
        });
      }).catch(function (error) {
        return response.status(400).json({
          status: 400,
          error: error.error
        });
      });
    }
  }, {
    key: 'create',
    value: function create(request, response) {
      if (request.user.isadmin) {
        _Meetup2.default.create(request.body).then(function (result) {
          if (result.rowCount > 0) {
            var data = (0, _assign2.default)({}, result.rows[0]);
            delete data.created_at;
            delete data.updated_at;
            delete data.images;
            return response.status(201).json({
              status: 201,
              data: data
            });
          }
          return response.status(500).json({
            status: 500,
            error: 'Meetup creation failed'
          });
        }).catch(function (error) {
          return response.status(422).json({
            status: 422,
            error: error.error
          });
        });
      } else {
        return _helper2.default.errorResponse(response, {
          status: 401,
          error: 'You are not authorized to perform this action'
        });
      }
    }
  }, {
    key: 'upcoming',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(request, response) {
        var _ref4, rows;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Meetup2.default.upcoming();

              case 3:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                if (!(rows.length > 0)) {
                  _context2.next = 8;
                  break;
                }

                rows.map(function (row) {
                  delete row.images;
                  delete row.created_at;
                  delete row.updated_at;
                });
                return _context2.abrupt('return', response.status(200).json({
                  status: 200,
                  data: [rows]
                }));

              case 8:
                return _context2.abrupt('return', _helper2.default.errorResponse(response, {
                  status: 404,
                  error: 'No Upcoming meetups'
                }));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _helper2.default.errorResponse(response, {
                  status: 400,
                  error: 'Error occured'
                }));

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 11]]);
      }));

      function upcoming(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return upcoming;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(request, response) {
        var _ref6, rows, result;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!request.user.isadmin) {
                  _context3.next = 19;
                  break;
                }

                _context3.prev = 1;
                _context3.next = 4;
                return _Meetup2.default.find(request.params.id);

              case 4:
                _ref6 = _context3.sent;
                rows = _ref6.rows;

                if (!(rows.length > 0)) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 9;
                return _Meetup2.default.update(rows, request.body);

              case 9:
                result = _context3.sent;
                return _context3.abrupt('return', response.status(200).json({
                  status: 200,
                  data: result.rows[0]
                }));

              case 11:
                return _context3.abrupt('return', _helper2.default.errorResponse(response, { status: 404, error: 'Meetup not found' }));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3['catch'](1);
                return _context3.abrupt('return', _helper2.default.errorResponse(response, { status: _context3.t0.status, error: _context3.t0.error }));

              case 17:
                _context3.next = 20;
                break;

              case 19:
                return _context3.abrupt('return', _helper2.default.errorResponse(response, { status: 401, error: 'You are not authorized to perform this action' }));

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 14]]);
      }));

      function update(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'destroy',
    value: function destroy(request, response) {
      if (request.user.isadmin) {
        _Meetup2.default.find(request.params.id).then(function (onDeathRow) {
          _Meetup2.default.delete(onDeathRow).then(function () {
            return response.status(200).json({
              status: 200,
              message: 'Meetup deleted successfully'
            });
          }).catch(function (error) {
            return response.status(400).json({
              status: 400,
              error: error.error
            });
          });
        }).catch(function (error) {
          return response.status(404).json({
            status: 400,
            error: error.error
          });
        });
      } else {
        return _helper2.default.errorResponse(response, { status: 401, error: 'You are not authorized to perform this action' });
      }
    }
  }]);
  return meetupController;
}();

exports.default = meetupController;