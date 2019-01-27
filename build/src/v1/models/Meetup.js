'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

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

var table = 'meetups';

var Meetup = function () {
  function Meetup() {
    (0, _classCallCheck3.default)(this, Meetup);
  }

  (0, _createClass3.default)(Meetup, null, [{
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
    key: 'upcoming',
    value: function upcoming() {
      var statement = 'SELECT * FROM ' + table + ' WHERE date > NOW() ORDER BY date ASC';
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
  }, {
    key: 'create',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload) {
        var meetup, _ref2, rows, statement;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                meetup = {
                  topic: payload.topic,
                  location: payload.location,
                  date: payload.date,
                  images: payload.images ? payload.images : {},
                  tags: payload.tags ? payload.tags : {}
                };
                _context.next = 3;
                return _queryFactory2.default.run('SELECT topic FROM ' + table + ' WHERE topic = $1 OR date = $2', [meetup.topic, meetup.date]);

              case 3:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (!rows[0]) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', _promise2.default.reject({ status: 422, error: 'Similar meetup exists already' }));

              case 7:
                statement = 'INSERT INTO ' + table + '(topic,location,date,images,tags) VALUES($1, $2, $3, $4, $5) returning *';
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  _queryFactory2.default.run(statement, (0, _values2.default)(meetup)).then(function (response) {
                    return resolve(response);
                  }).catch(function (error) {
                    return reject(error);
                  });
                }));

              case 9:
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
    value: function update(meetup, request) {
      var topic = request.topic,
          location = request.location,
          date = request.date;


      var statement = 'UPDATE ' + table + ' SET topic=$1, location=$2, date=$3, tags=$4, images=$5 WHERE id=$6 returning *';
      var tags = void 0;
      var images = void 0;
      if (request.tags instanceof Array) {
        request.tags.forEach(function (tag) {
          meetup[0].tags.find(function (existingTag) {
            return existingTag === tag.trim();
          }) ? '' : meetup[0].tags.push(tag.trim());
        });
      } else if (request.tags === undefined) {
        meetup[0].tags;
      } else {
        meetup[0].tags.find(function (existingTag) {
          return existingTag === request.tags.trim();
        }) ? '' : meetup[0].tags.push(request.tags.trim());
      }
      tags = meetup[0].tags;

      if (request.images instanceof Array) {
        request.images.forEach(function (url) {
          meetup[0].images.find(function (existingUrl) {
            return existingUrl === url.trim();
          }) ? '' : meetup[0].images.push(url.trim());
        });
      } else if (request.images === undefined) {
        meetup[0].images = meetup[0].images;
      } else {
        meetup[0].images.find(function (existingUrl) {
          return existingUrl === request.images.trim();
        }) ? '' : meetup[0].images.push(request.images.trim());
      }
      images = meetup[0].images;

      var data = [topic || meetup[0].topic, location || meetup[0].location, date || meetup[0].date, tags = request.tags ? tags : meetup[0].tags, images = request.images ? images : meetup[0].images, meetup[0].id];

      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [].concat(data)).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'delete',
    value: function _delete(meetup) {
      var statement = 'DELETE FROM ' + table + ' WHERE id=$1';
      return new _promise2.default(function (resolve, reject) {
        _queryFactory2.default.run(statement, [meetup.rows[0].id]).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);
  return Meetup;
}();

exports.default = Meetup;