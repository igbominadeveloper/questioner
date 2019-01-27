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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var table = 'questions'; /* eslint-disable no-empty */
/* eslint-disable camelcase */
/* eslint-disable prefer-promise-reject-errors */

var Question = function () {
  function Question() {
    (0, _classCallCheck3.default)(this, Question);
  }

  (0, _createClass3.default)(Question, null, [{
    key: 'all',
    value: function all() {
      var statement = 'SELECT * FROM ' + table;
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      var statement = 'SELECT * FROM ' + table + ' WHERE id = $1';
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [id]).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
    /** Create a new question
     * @param {object} payload
     * @returns {Object} DB row
    */

  }, {
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload) {
        var title, body, meetup_id, user_id, insertQuery;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                title = payload.title, body = payload.body, meetup_id = payload.meetup_id, user_id = payload.user_id;
                insertQuery = 'INSERT INTO ' + table + '(title, body, meetup_id, user_id) \n                          VALUES($1, $2, $3, $4) returning *';
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _queryFactory2.default.run(insertQuery, [title, body, meetup_id, user_id]).then(function (response) {
                    return resolve(response);
                  }).catch(function (error) {
                    return reject(error);
                  });
                }));

              case 3:
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
  }, {
    key: 'update',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(tableRow, value) {
        var statement;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                statement = 'UPDATE ' + table + ' SET ' + tableRow + ' = $1 returning *';
                return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _queryFactory2.default.run(statement, [value]).then(function (response) {
                    return resolve(response);
                  }).catch(function (error) {
                    return reject(error);
                  });
                }));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'delete',
    value: function _delete(id) {
      var statement = 'DELETE FROM ' + table + ' WHERE id=$1';
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [id]).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'createComment',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(payload) {
        var user_id, question_id, topic, comment, statement, _ref4, rows;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                user_id = payload.user_id, question_id = payload.question_id, topic = payload.topic, comment = payload.comment;
                statement = 'INSERT INTO comments(user_id,question_id,topic,comment) VALUES($1,$2,$3,$4) returning *';
                _context3.next = 4;
                return _queryFactory2.default.run('SELECT * FROM comments WHERE user_id = $1 AND comment = $2', [user_id, comment]);

              case 4:
                _ref4 = _context3.sent;
                rows = _ref4.rows;

                if (!rows[0]) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return', _promise2.default.reject({ status: 422, message: 'You have submitted this comment already' }));

              case 8:
                return _context3.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _queryFactory2.default.run(statement, [user_id, question_id, topic, comment]).then(function (response) {
                    return resolve(response);
                  }).catch(function (error) {
                    return reject(error);
                  });
                }));

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createComment(_x4) {
        return _ref3.apply(this, arguments);
      }

      return createComment;
    }()
  }]);
  return Question;
}();

exports.default = Question;