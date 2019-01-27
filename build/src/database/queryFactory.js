'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var pool = void 0;

if (process.env.NODE_ENV == 'test') {
  pool = new _pg.Pool({
    connectionString: process.env.TEST_DATABASE_URL
  });
} else {
  pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
}

pool.on('connect', function (response, error) {
  console.table(response.connectionParameters);
});

var QueryFactory = function () {
  function QueryFactory() {
    (0, _classCallCheck3.default)(this, QueryFactory);
  }

  (0, _createClass3.default)(QueryFactory, null, [{
    key: 'run',
    value: function run(statement) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return new _promise2.default(function (resolve, reject) {
        pool.query(statement, parameters).then(function (response) {
          return resolve(response);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);
  return QueryFactory;
}();

exports.default = QueryFactory;