'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupsApi = '/api/v1/meetups'; /* eslint-disable prefer-destructuring */

var loginApi = '/api/v1/auth/login';

describe('Rsvp', function () {
  var meetup = void 0;
  var loggedInUser = '';
  var loggedInAdmin = '';
  before(function (done) {
    (0, _supertest2.default)(_app2.default).post(loginApi).send({ email: 'user@questioner.com', password: 'password1' }).end(function (_error, response) {
      (0, _expect2.default)(200);
      var _response$body$data$ = response.body.data[0],
          token = _response$body$data$.token,
          user = _response$body$data$.user;

      loggedInUser = { token: token, user: user };
    });
    (0, _supertest2.default)(_app2.default).post(loginApi).send({ email: 'superadmin@questioner.com', password: 'password1' }).end(function (_error, response) {
      (0, _expect2.default)(200);
      var _response$body$data$2 = response.body.data[0],
          token = _response$body$data$2.token,
          user = _response$body$data$2.user;

      loggedInAdmin = { token: token, user: user };
      done();
    });
  });
  describe('Token issue', function () {
    it('returns a 401 error when user token is not set', function (done) {
      (0, _supertest2.default)(_app2.default).get(meetupsApi + '/1/rsvps').end(function (_error, response) {
        (0, _expect2.default)(401);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        done();
      });
    });
  });

  describe('GET /meetups/:id/rsvps', function () {
    var validMeetup = {
      topic: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      location: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      date: new Date().toISOString()
    };
    before(function (done) {
      (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', loggedInAdmin.token).send(validMeetup).end(function (_error, response) {
        (0, _expect2.default)(201);
        meetup = response.body.data;
        done();
      });
    });

    it('returns 404 response when there are no rsvps for a meetup', function (done) {
      (0, _supertest2.default)(_app2.default).get(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInAdmin.token).end(function (_error, response) {
        (0, _expect2.default)(404);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        done();
      });
    });

    describe('POST /meetups/:id/rsvps', function () {
      it('returns a 404 response when meetup ID is not a valid integer', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi + '/uinskjhj49894jihj/rsvps').set('x-access-token', loggedInUser.token).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body).toHaveProperty('error');
          (0, _expect2.default)(response.body.error).toMatch(/integer/);
          done();
        });
      });

      it('returns a 400 response when request status is missing from the request', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInUser.token).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body).toHaveProperty('error');
          (0, _expect2.default)(response.body.error).toMatch(/status/);
          done();
        });
      });

      it('returns a 400 response when request status is an empty string', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInUser.token).send({ status: '' }).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body).toHaveProperty('error');
          (0, _expect2.default)(response.body.error).toMatch(/empty/);
          done();
        });
      });

      it('returns a 400 response when request status is not one of yes, no or maybe', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInUser.token).send({ status: 'Hell No' }).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body).toHaveProperty('error');
          (0, _expect2.default)(response.body.error).toMatch(/yes, no, maybe/);
          done();
        });
      });

      it('returns a 404 response when the meetup ID specified does not exist', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi + '/90000/rsvps').set('x-access-token', loggedInUser.token).send({ status: 'no' }).end(function (_error, response) {
          (0, _expect2.default)(404);
          (0, _expect2.default)(response.body.status).toBe(404);
          (0, _expect2.default)(response.body).toHaveProperty('error');
          (0, _expect2.default)(response.body.error).toMatch(/exist/);
          done();
        });
      });

      it('returns 201 response when user rsvp is received', function (done) {
        var status = 'no';
        (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInUser.token).send({ status: status }).end(function (_error, response) {
          (0, _expect2.default)(201);
          (0, _expect2.default)(response.body.data.status).toBe(status);
          done();
        });
      });

      it('returns 201 response and returns maybe rsvp when a user changes status to maybe', function (done) {
        var status = 'maybe';
        (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInUser.token).send({ status: status }).end(function (_error, response) {
          (0, _expect2.default)(201);
          (0, _expect2.default)(response.body.data.status).toBe(status);
          done();
        });
      });

      it('returns 201 response and return yes when a user changes status to yes', function (done) {
        var status = 'yes';
        (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInUser.token).send({ status: status }).end(function (_error, response) {
          (0, _expect2.default)(201);
          (0, _expect2.default)(response.body.data.status).toBe(status);
          done();
        });
      });
    });

    describe('GET /api/v1/meetups:id/rsvps', function () {
      it('returns 401 response when a non-admin tries to fetch rsvps for a meetup', function (done) {
        (0, _supertest2.default)(_app2.default).get(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInUser.token).end(function (_error, response) {
          (0, _expect2.default)(401);
          (0, _expect2.default)(response.body).toHaveProperty('error');
          done();
        });
      });

      it('returns 200 response and an array of rsvps for a specified meetup', function (done) {
        (0, _supertest2.default)(_app2.default).get(meetupsApi + '/' + meetup.id + '/rsvps').set('x-access-token', loggedInAdmin.token).end(function (_error, response) {
          (0, _expect2.default)(200);
          (0, _expect2.default)(response.body.data.length).toBeGreaterThan(0);
          done();
        });
      });
    });
  });

  //
  //   it('return 400 and a custom error message when request is missing valid payload', () => {
  //     request(app)
  //       .post(`${meetupsApi}/1/rsvps`)
  //       .then((response) => {
  //         expect(response.body.error).toBe('Request must contain valid user and a status - Yes, No or Maybe');
  //         expect(response.body.status).toBe(400);
  //       });
  //   });
  //   it('returns exact rsvp status a user sends to the server', () => {
  //     const payload = { user: 4, status: 'Maybe' };
  //     request(app)
  //       .post(`${meetupsApi}/1/rsvps`)
  //       .send(payload)
  //       .then((response) => {
  //         expect(response.body.status).toBe(201);
  //         expect(response.body.data.status).toBe('Maybe');
  //       });
  //   });
  // });
});