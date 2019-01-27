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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Question = require('../models/Question');

var _Question2 = _interopRequireDefault(_Question);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _queryFactory = require('../../database/queryFactory');

var _queryFactory2 = _interopRequireDefault(_queryFactory);

var _Meetup = require('../models/Meetup');

var _Meetup2 = _interopRequireDefault(_Meetup);

var _vote2 = require('../models/vote');

var _vote3 = _interopRequireDefault(_vote2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuestionsController = function () {
  function QuestionsController() {
    (0, _classCallCheck3.default)(this, QuestionsController);
  }

  (0, _createClass3.default)(QuestionsController, null, [{
    key: 'index',
    value: function index(request, response) {
      _Question2.default.all().then(function (result) {
        if (result.rowCount > 0) {
          result.rows.map(function (row) {
            delete row.created_at;
            delete row.updated_at;
          });
          return response.status(200).json({
            status: 200,
            data: [result.rows]
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'No Questions available right now'
        });
      }).catch(function (error) {
        return response.status(400).json({
          status: 400,
          error: error.error
        });
      });
    }
  }, {
    key: 'show',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, response) {
        var _ref2, rows, data;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Question2.default.find(request.params.id);

              case 3:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (!(rows.length > 0)) {
                  _context.next = 10;
                  break;
                }

                data = (0, _assign2.default)({}, rows[0]);

                delete data.updated_at;
                delete data.created_at;
                return _context.abrupt('return', response.status(200).json({
                  status: 200,
                  data: data
                }));

              case 10:
                return _context.abrupt('return', _helper2.default.errorResponse(response, { status: 404 }));

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', _helper2.default.errorResponse(response, _context.t0));

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 13]]);
      }));

      function show(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return show;
    }()
  }, {
    key: 'create',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(request, response) {
        var newQuestion, questionMeetup, questionResult, _ref4, rows, data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                newQuestion = request.body;

                newQuestion.user_id = request.user.id;
                _context2.next = 4;
                return _Meetup2.default.find(newQuestion.meetup_id);

              case 4:
                questionMeetup = _context2.sent;

                if (!(questionMeetup.rowCount === 0)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', _helper2.default.errorResponse(response, { status: 404, error: 'You cannot ask question on a non-existent meetup' }));

              case 7:
                _context2.next = 9;
                return _queryFactory2.default.run('SELECT * FROM questions WHERE meetup_id = $1 AND title = $2 OR body = $3', [newQuestion.meetup_id, newQuestion.title, newQuestion.body]);

              case 9:
                questionResult = _context2.sent;

                if (!(questionResult.rowCount > 0)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', _helper2.default.errorResponse(response, { status: 409, error: 'Your question has been asked already: see http://' + request.hostname + request.url + '/' + questionResult.rows[0].id }));

              case 12:
                _context2.prev = 12;
                _context2.next = 15;
                return _Question2.default.create(newQuestion);

              case 15:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                data = (0, _assign2.default)({}, rows[0]);

                delete data.updated_at;
                delete data.user_id;
                delete data.created_at;
                delete data.downvotes;
                delete data.upvotes;
                return _context2.abrupt('return', response.status(201).json({
                  status: 201,
                  data: data
                }));

              case 26:
                _context2.prev = 26;
                _context2.t0 = _context2['catch'](12);
                return _context2.abrupt('return', _helper2.default.errorResponse(response, _context2.t0));

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[12, 26]]);
      }));

      function create(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'update',
    value: function update(request, response) {
      var requestBody = request.body;
      _Question2.default.find(request.params.id).then(function (result) {
        return result;
      }).then(function (result) {
        return _Question2.default.update(result, requestBody);
      }).then(function (updated) {
        updated.rows.map(function (row) {
          delete row.created_at;
        });
        return response.status(202).json({
          status: 202,
          data: updated.rows[0]
        });
      }).catch(function (error) {
        return response.status(400).json({
          status: 400,
          error: error.error
        });
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(request, response) {
      if (request.user.isadmin) {
        _Question2.default.find(request.params.id).then(function (result) {
          if (result.rowCount > 0) {
            return result;
          }
          return response.status(404).json({
            status: 404,
            error: 'Meetup doesn\'t exist'
          });
        }).then(function (onDeathRow) {
          _Question2.default.delete(onDeathRow.rows[0].id).then(function () {
            return response.status(200).json({
              status: 200,
              message: 'Question deleted successfully'
            });
          });
        }).catch(function (error) {
          return response.status(400).json({
            status: 400,
            error: error.error
          });
        });
      }
      return _helper2.default.errorResponse(response, {
        status: 401,
        message: 'You are not authorized to perform this action'
      });
    }
  }, {
    key: 'createComment',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(request, response) {
        var result, _ref6, rows, newComment;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Question2.default.find(request.body.question_id);

              case 3:
                result = _context3.sent;

                if (!(result.rowCount > 0)) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 7;
                return _Question2.default.createComment(request.body);

              case 7:
                _ref6 = _context3.sent;
                rows = _ref6.rows;

                if (!rows[0]) {
                  _context3.next = 15;
                  break;
                }

                newComment = (0, _assign2.default)({}, rows[0]);

                delete newComment.id;
                delete newComment.created_at;
                delete newComment.updated_at;
                return _context3.abrupt('return', response.status(201).json({
                  status: 201,
                  data: newComment
                }));

              case 15:
                return _context3.abrupt('return', _helper2.default.errorResponse(response, {
                  error: 400,
                  message: 'Error occured! Comment couldn\'t be created'
                }));

              case 16:
                return _context3.abrupt('return', _helper2.default.errorResponse(response, {
                  error: 404,
                  message: 'Cannot comment on a non-existing question'
                }));

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3['catch'](0);
                return _context3.abrupt('return', _helper2.default.errorResponse(response, _context3.t0));

              case 22:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 19]]);
      }));

      function createComment(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return createComment;
    }()
  }, {
    key: 'vote',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(request, response) {
        var newVote, voteType, _ref8, rows, singleVote, _value, _result, _updatedQuestion, currentVote, row, newQuestionValue, value, result, updatedQuestion;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                newVote = {
                  user_id: parseInt(request.user.id, 10),
                  question_id: parseInt(request.params.id, 10)
                };
                voteType = request.url.endsWith('upvote') ? 'upvote' : 'downvote';
                _context4.next = 4;
                return _Question2.default.find(newVote.question_id);

              case 4:
                _ref8 = _context4.sent;
                rows = _ref8.rows;

                if (!rows[0]) {
                  _context4.next = 42;
                  break;
                }

                _context4.next = 9;
                return _vote3.default.find(newVote);

              case 9:
                singleVote = _context4.sent;

                if (!(singleVote.rowCount === 0)) {
                  _context4.next = 23;
                  break;
                }

                _context4.next = 13;
                return _vote3.default.record(voteType, newVote);

              case 13:
                _value = rows[0][voteType + 's'] === 0 ? 0 : parseInt(rows[0][voteType + 's'], 10);
                _context4.next = 16;
                return _Question2.default.update(voteType + 's', _value + 1);

              case 16:
                _result = _context4.sent;
                _updatedQuestion = (0, _assign2.default)({}, _result.rows[0]);

                delete _updatedQuestion.id;
                delete _updatedQuestion.user_id;
                delete _updatedQuestion.created_at;
                delete _updatedQuestion.updated_at;
                return _context4.abrupt('return', response.status(200).json({
                  status: 200,
                  data: _updatedQuestion
                }));

              case 23:
                _context4.next = 25;
                return _vote3.default.find(newVote);

              case 25:
                currentVote = _context4.sent;
                row = currentVote.rows[0].upvote === 1 ? 'upvotes' : 'downvotes';
                _context4.next = 29;
                return _Question2.default.find(newVote.question_id);

              case 29:
                newQuestionValue = _context4.sent;
                _context4.next = 32;
                return _vote3.default.remove(newVote);

              case 32:
                value = parseInt(newQuestionValue.rows[0]['' + row], 10);
                _context4.next = 35;
                return _Question2.default.update(row, value - 1);

              case 35:
                result = _context4.sent;
                updatedQuestion = (0, _assign2.default)({}, result.rows[0]);

                delete updatedQuestion.id;
                delete updatedQuestion.user_id;
                delete updatedQuestion.created_at;
                delete updatedQuestion.updated_at;
                return _context4.abrupt('return', response.status(200).json({
                  status: 200,
                  data: updatedQuestion
                }));

              case 42:
                return _context4.abrupt('return', _helper2.default.errorResponse(response, { status: 404, error: 'Cannot vote on a non-existing question' }));

              case 43:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function vote(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return vote;
    }()
  }]);
  return QuestionsController;
}(); /* eslint-disable camelcase */


exports.default = QuestionsController;