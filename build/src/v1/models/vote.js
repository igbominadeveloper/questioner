'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _queryFactory = require('../../database/queryFactory');

var _queryFactory2 = _interopRequireDefault(_queryFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var table = 'votes'; /* eslint-disable camelcase */

var Vote = function () {
  function Vote() {
    (0, _classCallCheck3.default)(this, Vote);
  }

  (0, _createClass3.default)(Vote, null, [{
    key: 'find',
    value: function find(newVote) {
      var user_id = newVote.user_id,
          question_id = newVote.question_id;

      var statement = 'SELECT * FROM ' + table + ' WHERE question_id= $1 AND user_id=$2';
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [question_id, user_id]).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'record',
    value: function record(voteType, newVote) {
      var user_id = newVote.user_id,
          question_id = newVote.question_id;

      var weight = voteType === 'upvote' ? '1,0' : '0,1';
      var statement = 'INSERT INTO ' + table + ' (user_id, question_id, upvote, downvote) VALUES($1, $2, $3, $4) returning *';
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [user_id, question_id].concat((0, _toConsumableArray3.default)(weight.split(',')))).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'remove',
    value: function remove(newVote) {
      var user_id = newVote.user_id,
          question_id = newVote.question_id;

      var statement = 'DELETE FROM ' + table + ' WHERE user_id=$1 AND question_id=$2 returning *';
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [user_id, question_id]).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);
  return Vote;
}();

exports.default = Vote;