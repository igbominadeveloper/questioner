'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _usersTable = require('./migrations/usersTable');

var _usersTable2 = _interopRequireDefault(_usersTable);

var _commentsTable = require('./migrations/commentsTable');

var _commentsTable2 = _interopRequireDefault(_commentsTable);

var _questionsTable = require('./migrations/questionsTable');

var _questionsTable2 = _interopRequireDefault(_questionsTable);

var _meetupsTable = require('./migrations/meetupsTable');

var _meetupsTable2 = _interopRequireDefault(_meetupsTable);

var _rsvpsTable = require('./migrations/rsvpsTable');

var _rsvpsTable2 = _interopRequireDefault(_rsvpsTable);

var _votesTable = require('./migrations/votesTable');

var _votesTable2 = _interopRequireDefault(_votesTable);

var _seeder = require('./seeder');

var _seeder2 = _interopRequireDefault(_seeder);

var _queryFactory = require('./queryFactory');

var _queryFactory2 = _interopRequireDefault(_queryFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var up = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _queryFactory2.default.run(_usersTable2.default.createUsersQuery.query);

          case 3:
            _context.next = 5;
            return _queryFactory2.default.run(_meetupsTable2.default.createMeetupsQuery.query);

          case 5:
            _context.next = 7;
            return _queryFactory2.default.run(_rsvpsTable2.default.createRsvpsQuery.query);

          case 7:
            _context.next = 9;
            return _queryFactory2.default.run(_questionsTable2.default.createQuestionsQuery.query);

          case 9:
            _context.next = 11;
            return _queryFactory2.default.run(_commentsTable2.default.createCommentsQuery.query);

          case 11:
            _context.next = 13;
            return _queryFactory2.default.run(_votesTable2.default.createVotesQuery.query);

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function up() {
    return _ref.apply(this, arguments);
  };
}();

var down = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _queryFactory2.default.run(_votesTable2.default.dropVotesQuery.query);

          case 3:
            _context2.next = 5;
            return _queryFactory2.default.run(_commentsTable2.default.dropCommentsQuery.query);

          case 5:
            _context2.next = 7;
            return _queryFactory2.default.run(_questionsTable2.default.dropQuestionsQuery.query);

          case 7:
            _context2.next = 9;
            return _queryFactory2.default.run(_rsvpsTable2.default.dropRsvpsQuery.query);

          case 9:
            _context2.next = 11;
            return _queryFactory2.default.run(_meetupsTable2.default.dropMeetupsQuery.query);

          case 11:
            _context2.next = 13;
            return _queryFactory2.default.run(_usersTable2.default.dropUsersQuery.query);

          case 13:
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 15]]);
  }));

  return function down() {
    return _ref2.apply(this, arguments);
  };
}();

var seed = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _queryFactory2.default.run(_seeder2.default.users);

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3['catch'](0);

            console.log(_context3.t0);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 5]]);
  }));

  return function seed() {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  up: up,
  down: down,
  seed: seed
};

require('make-runnable');