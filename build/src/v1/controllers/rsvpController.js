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

var _rsvp = require('../models/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _Meetup = require('../models/Meetup');

var _Meetup2 = _interopRequireDefault(_Meetup);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RsvpController = function () {
  function RsvpController() {
    (0, _classCallCheck3.default)(this, RsvpController);
  }

  (0, _createClass3.default)(RsvpController, null, [{
    key: 'index',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response) {
        var _ref2, rows;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(request.user.isadmin === 1)) {
                  _context.next = 15;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return _rsvp2.default.all(request.params.id);

              case 4:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (!(rows.length > 0)) {
                  _context.next = 9;
                  break;
                }

                rows.map(function (row) {
                  delete row.created_at;
                  delete row.id;
                  delete row.updated_at;
                  delete row.meetup_id;
                });
                return _context.abrupt('return', response.status(200).json({
                  status: 200,
                  data: rows
                }));

              case 9:
                return _context.abrupt('return', _helper2.default.errorResponse(response, { status: 404, error: 'No RSVPS yet for this meetup' }));

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](1);
                return _context.abrupt('return', _helper2.default.errorResponse(response, { status: 404 }));

              case 15:
                return _context.abrupt('return', _helper2.default.errorResponse(response, { status: 401, error: 'This action is restricted to admin only' }));

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 12]]);
      }));

      function index(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: 'create',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(request, response) {
        var payload, _ref4, rows, result;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                payload = {
                  user_id: request.user.id,
                  meetup_id: request.params.id,
                  status: request.body.status
                };
                _context2.prev = 1;
                _context2.next = 4;
                return _Meetup2.default.find(payload.meetup_id);

              case 4:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                if (!(rows.length > 0)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 9;
                return _rsvp2.default.create(payload);

              case 9:
                result = _context2.sent;

                result.rows.map(function (row) {
                  delete row.created_at;
                  delete row.updated_at;
                  delete row.meetup_id;
                });
                return _context2.abrupt('return', response.status(201).json({
                  status: 201,
                  data: result.rows[0]
                }));

              case 12:
                return _context2.abrupt('return', _helper2.default.errorResponse(response, {
                  status: 404,
                  error: 'Meetup specified doesn\'t exist'
                }));

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](1);
                return _context2.abrupt('return', _helper2.default.errorResponse(response, { status: _context2.t0.status, error: _context2.t0.message }));

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 15]]);
      }));

      function create(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return RsvpController;
}(); /* eslint-disable quotes */


exports.default = RsvpController;