'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionApi = '/api/v1/questions'; /* eslint-disable no-restricted-globals */


describe('Question', function () {
  var userToken = void 0;
  var adminToken = void 0;
  var user = void 0;
  var admin = void 0;
  var id = 1000;

  var userCredentials = {
    email: 'user@questioner.com',
    password: 'password1'
  };

  var adminCredentials = {
    email: 'superadmin@questioner.com',
    password: 'password1'
  };

  before(function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').send(userCredentials).end(function (error, response) {
      (0, _expect2.default)(200);
      var data = response.body.data;

      userToken = data[0].token;
      // eslint-disable-next-line prefer-destructuring
      user = data[0].user;
    });

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').send(adminCredentials).end(function (error, response) {
      (0, _expect2.default)(200);
      var data = response.body.data;

      adminToken = data[0].token;
      // eslint-disable-next-line prefer-destructuring
      admin = data[0].user;
      done();
    });
  });

  describe('GET /api/v1/questions', function () {
    it('returns 401 when token is not set', function (done) {
      (0, _supertest2.default)(_app2.default).get(questionApi).end(function (_error, response) {
        (0, _expect2.default)(401);
        (0, _expect2.default)(response.status).toBe(401);
        done();
      });
    });
    it('returns 401 response when a wrong token is set', function (done) {
      (0, _supertest2.default)(_app2.default).get(questionApi).set('x-access-token', 'jhjdhjhdjhjhjhjdhdvh').end(function (_error, response) {
        (0, _expect2.default)(422);
        done();
      });
    });
    it('returns 404 response and an empty array of questions', function (done) {
      (0, _supertest2.default)(_app2.default).get(questionApi).set('x-access-token', userToken).end(function (_error, response) {
        (0, _expect2.default)(response.status).toBe(404);
        done();
      });
    });

    it('returns 404 response and user tries to fetch a non-existing question', function (done) {
      (0, _supertest2.default)(_app2.default).get(questionApi + '/' + id).set('x-access-token', userToken).end(function (_error, response) {
        (0, _expect2.default)(response.status).toBe(404);
        done();
      });
    });
  });

  describe('POST /api/v1/questions', function () {
    it('returns a 401 error when user token is not set', function (done) {
      (0, _supertest2.default)(_app2.default).post(questionApi).end(function (_error, response) {
        (0, _expect2.default)(response.status).toBe(401);
        done();
      });
    });

    it('returns a 400 error when user tries to ask question on a non-exisiting meetup', function (done) {
      var randomQuestion = {
        meetup_id: 20,
        user_id: user.id,
        title: 'My Question title',
        body: 'My Question Body'
      };

      (0, _supertest2.default)(_app2.default).post(questionApi).send(randomQuestion).set('x-access-token', userToken).end(function (_error, response) {
        (0, _expect2.default)(404);
        (0, _expect2.default)(response.body.status).toBe(404);
        done();
      });
    });
  });

  describe('POST /api/v1/questions', function () {
    var newMeetup = void 0;
    var returnedQuestion = void 0;

    before(function (done) {
      var meetupOne = {
        topic: 'Meetup for questions',
        location: 'Akure, Nigeria',
        date: '2019-04-19T11:36:38.380Z'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/meetups').set('x-access-token', adminToken).send(meetupOne).end(function (_error, response) {
        (0, _expect2.default)(201);
        var data = response.body.data;

        newMeetup = data;
        done();
      });
    });

    it('returns a 400 error when user does not put any body in the POST request', function (done) {
      (0, _supertest2.default)(_app2.default).post(questionApi).set('x-access-token', userToken).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.status).toBe(400);
        done();
      });
    });

    it('returns a 400 error when request body is missing a meetupId', function (done) {
      var invalidQuestionOne = {
        user_id: user.id,
        title: 'My Question title',
        body: 'Question body'
      };
      (0, _supertest2.default)(_app2.default).post(questionApi).set('x-access-token', userToken).send(invalidQuestionOne).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.body.status).toBe(400);
        (0, _expect2.default)(response.body.error).toMatch(/meetup_id/);
        done();
      });
    });

    it('returns a 400 error when request body is missing a userId', function (done) {
      var invalidQuestionTwo = {
        meetup_id: newMeetup.id,
        title: 'My Question title',
        body: 'Question body'
      };

      (0, _supertest2.default)(_app2.default).post(questionApi).set('x-access-token', userToken).send(invalidQuestionTwo).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.body.status).toBe(400);
        (0, _expect2.default)(response.body.error).toMatch(/user_id/);
        done();
      });
    });

    it('returns a 400 error when request body is missing a question title', function (done) {
      var invalidQuestionThree = {
        meetup_id: newMeetup.id,
        user_id: user.id,
        body: 'Question body'
      };
      (0, _supertest2.default)(_app2.default).post(questionApi).set('x-access-token', userToken).send(invalidQuestionThree).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.body.status).toBe(400);
        (0, _expect2.default)(response.body.error).toMatch(/title/);
        done();
      });
    });

    it('returns a 400 error when request body is missing a question body', function (done) {
      var invalidQuestionFour = {
        meetup_id: newMeetup.id,
        user_id: user.id,
        title: 'My Question title'
      };
      (0, _supertest2.default)(_app2.default).post(questionApi).set('x-access-token', userToken).send(invalidQuestionFour).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.body.status).toBe(400);
        (0, _expect2.default)(response.body.error).toMatch(/body/);
        done();
      });
    });

    it('returns a 201 response when question is created successfully', function (done) {
      var validQuestionOne = {
        meetup_id: newMeetup.id,
        user_id: user.id,
        title: 'My Question title',
        body: 'My Question body'
      };
      (0, _supertest2.default)(_app2.default).post(questionApi).set('x-access-token', userToken).send(validQuestionOne).end(function (_error, response) {
        (0, _expect2.default)(201);
        (0, _expect2.default)(response.body.status).toBe(201);
        (0, _expect2.default)(response.body.data.title).toBe(validQuestionOne.title);
        (0, _expect2.default)(response.body.data.body).toBe(validQuestionOne.body);
        (0, _expect2.default)(response.body.data.meetup_id).toBe(validQuestionOne.meetup_id);
        returnedQuestion = response.body.data;
        done();
      });
    });

    it('returns a 409 error when user tries to create an existing question again', function (done) {
      var validQuestionOne = {
        meetup_id: newMeetup.id,
        user_id: user.id,
        title: 'My Question title',
        body: 'My Question body'
      };
      (0, _supertest2.default)(_app2.default).post(questionApi).set('x-access-token', userToken).send(validQuestionOne).end(function (_error, response) {
        (0, _expect2.default)(409);
        (0, _expect2.default)(response.body.status).toBe(409);
        done();
      });
    });

    describe('PATCH /api/v1/questions/:id', function () {
      it('upvotes a question successfully', function (done) {
        (0, _supertest2.default)(_app2.default).patch(questionApi + '/' + returnedQuestion.id + '/upvote').set('x-access-token', userToken).end(function (_error, response) {
          (0, _expect2.default)(response.body.status).toBe(200);
          (0, _expect2.default)(response.body.data.upvotes).toBeGreaterThan(0);
          done();
        });
      });

      it('doesn\'t downvote past 0 marker', function (done) {
        (0, _supertest2.default)(_app2.default).patch(questionApi + '/' + returnedQuestion.id + '/downvote').set('x-access-token', userToken).end(function (_error, response) {
          (0, _expect2.default)(200);
          (0, _expect2.default)(response.body.data.downvotes).toBe(0);
          (0, _expect2.default)(response.body.data.upvotes).toBe(0);
          done();
        });
      });
    });
  });

  describe('GET /api/v1/questions', function () {
    it('returns an array of created questions', function (done) {
      (0, _supertest2.default)(_app2.default).get(questionApi).set('x-access-token', userToken).end(function (_error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(response.body.status).toBe(200);
        (0, _expect2.default)(response.body.data[0].length).toBeGreaterThan(0);
        done();
      });
    });
  });
});