'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _Meetup = require('./Meetup');

var _Meetup2 = _interopRequireDefault(_Meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
var table = 'rsvps';

var Rsvp = function () {
  function Rsvp() {
    (0, _classCallCheck3.default)(this, Rsvp);
  }

  (0, _createClass3.default)(Rsvp, null, [{
    key: 'all',
    value: function all(meetupId) {
      var statement = 'SELECT * FROM ' + table + ' WHERE meetup_id = $1';
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [meetupId]).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(rsvp) {
        var user_id, meetup_id, status, statement, _ref2, rows, rsvpMeetup, topic;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user_id = rsvp.user_id, meetup_id = rsvp.meetup_id, status = rsvp.status;
                statement = 'INSERT INTO ' + table + '(user_id,meetup_id,status,topic) VALUES($1, $2, $3, $4) returning *';
                _context.next = 4;
                return _queryFactory2.default.run('SELECT meetup_id,user_id FROM ' + table + ' WHERE meetup_id = $1 AND user_id = $2', [meetup_id, user_id]);

              case 4:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (rows.length > 0) {
                  statement = 'UPDATE ' + table + ' SET status=$3,topic=$4 WHERE user_id=$1 AND meetup_id=$2 returning *';
                }
                _context.next = 9;
                return _Meetup2.default.find(meetup_id);

              case 9:
                rsvpMeetup = _context.sent;
                topic = rsvpMeetup.rows[0].topic;
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _queryFactory2.default.run(statement, [user_id, meetup_id, status, topic]).then(function (response) {
                    return resolve(response);
                  }).catch(function (error) {
                    return reject(error);
                  });
                }));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return Rsvp;
}();

exports.default = Rsvp;