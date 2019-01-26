'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupsApi = '/api/v1/meetups';

describe('Routes', function () {
  it('returns a 404 response code for invalid route', function () {
    (0, _supertest2.default)(_app2.default).get('/api').then(function (response) {
      (0, _expect2.default)(response.status).toBe(404);
    });
  });

  it('returns a 200 response code for a valid route', function () {
    (0, _supertest2.default)(_app2.default).get(meetupsApi).then(function (response) {
      (0, _expect2.default)(response.status).toBe(200);
    });
  });
});