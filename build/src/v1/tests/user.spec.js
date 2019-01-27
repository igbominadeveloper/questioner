'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginUrl = '/api/v1/auth/login';
var registrationUrl = '/api/v1/auth/signup';

describe('POST /api/v1/auth/login', function () {
  it('returns 400 response when user tries to login without any credentials', function (done) {
    (0, _supertest2.default)(_app2.default).post(loginUrl).expect(400, done);
  });
});

describe('POST /api/v1/auth/login', function () {
  it('returns 400 response when user tries to login with incomplete post data', function (done) {
    (0, _supertest2.default)(_app2.default).post(loginUrl).send({ email: 'favourafolayan@gmail.com' }).expect(400).end(function (err, res) {
      if (err) return done(err);
      (0, _expect2.default)(res.body.data);
    });
    done();
  });
});

describe('POST /api/v1/auth/login', function () {
  it('returns 404 response when an unregistered user tries to login', function (done) {
    (0, _supertest2.default)(_app2.default).post(loginUrl).send({ email: 'favourafolayan@gmail.com', password: 'password1' }).end(function (response, error) {
      (0, _expect2.default)(error.body.error).toBe('User not found');
      (0, _expect2.default)(error.body.status).toBe(404);
    });
    done();
  });
});

var registeredUser = '';

before(function (done) {
  var userData = {
    firstname: 'Freeze',
    lastname: 'Test User',
    email: 'afolayan@tech4dev.com',
    password: 'password1'
  };
  (0, _supertest2.default)(_app2.default).post(registrationUrl).send(userData).end(function (error, response) {
    registeredUser = response.body.data.user;
    console.log('Registered User is - ' + registeredUser);
  });
  done();
});

describe('POST /api/v1/auth/login', function () {
  it('returns 200 response when a registered user logs in with right credentials', function (done) {
    (0, _supertest2.default)(_app2.default).post(loginUrl).send({ email: 'afolayan@tech4dev.com', password: 'password1' }).end(function (error, response) {
      (0, _expect2.default)(response.body.status).toBe(200);
      (0, _expect2.default)(response.body.data[0].user.email).toBe('afolayan@tech4dev.com');
      (0, _expect2.default)(response.body.data[0].user.firstname).toBe('Freeze');
    });
    done();
  });
});

describe('POST /api/v1/auth/signup', function () {
  it('returns 400 response when user tries to register with no data', function (done) {
    (0, _supertest2.default)(_app2.default).post(registrationUrl).end(function (error, response) {
      (0, _expect2.default)(response.body.error).toBe('\"firstname\" is required');
      (0, _expect2.default)(response.body.status).toBe(400);
    });
    done();
  });
});

describe('POST /api/v1/auth/signup', function () {
  it('returns 400 response when firstname is not filled', function (done) {
    var payload = {
      lastname: 'Afolayan',
      othername: 'Ajide',
      email: 'favourafolayan@gmail.com',
      username: 'igbominadeveloper',
      password: 'password1'
    };
    (0, _supertest2.default)(_app2.default).post(registrationUrl).send(payload).end(function (error, response) {
      (0, _expect2.default)(response.body.error).toBe('\"firstname\" is required');
    });
    done();
  });
});

describe('POST /api/v1/auth/signup', function () {
  it('returns 400 response when lastname is not filled', function (done) {
    var payload = {
      firstname: 'Favour',
      othername: 'Ajide',
      email: 'favourafolayan@gmail.com',
      username: 'igbominadeveloper',
      password: 'password1'
    };
    (0, _supertest2.default)(_app2.default).post(registrationUrl).send(payload).end(function (error, response) {
      (0, _expect2.default)(response.body.error).toBe('\"lastname\" is required');
    });
    done();
  });
});

describe('POST /api/v1/auth/signup', function () {
  it('returns 400 response when email is not filled', function (done) {
    var payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      othername: 'Ajide',
      email: '',
      username: 'igbominadeveloper',
      password: 'password1'
    };
    (0, _supertest2.default)(_app2.default).post(registrationUrl).send(payload).end(function (error, response) {
      (0, _expect2.default)(response.body.status).toBe(400);
      (0, _expect2.default)(response.body.error).toBe('\"email\" is not allowed to be empty');
    });
    done();
  });
});

describe('POST /api/v1/auth/signup', function () {
  it('returns 400 response when email is not a valid email', function (done) {
    var payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      othername: 'Ajide',
      email: 'favourafolayangmail',
      username: 'igbominadeveloper',
      password: 'password1'
    };
    (0, _supertest2.default)(_app2.default).post(registrationUrl).send(payload).end(function (error, response) {
      (0, _expect2.default)(response.body.status).toBe(400);
      (0, _expect2.default)(response.body.error).toBe('\"email\" must be a valid email');
    });
    done();
  });
});

describe('POST /api/v1/auth/signup', function () {
  it('returns 400 response when password is not included', function (done) {
    var payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      email: 'favourafolayangmail@gmail.com',
      username: 'igbominadeveloper',
      password: ''
    };
    (0, _supertest2.default)(_app2.default).post(registrationUrl).send(payload).end(function (error, response) {
      (0, _expect2.default)(response.body.status).toBe(400);
      (0, _expect2.default)(response.body.error).toBe('\"password\" is not allowed to be empty');
    });
    done();
  });
});

describe('POST /api/v1/auth/signup', function () {
  it('returns 200 response when user registration is successful', function (done) {
    var payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      email: 'favour@dind.com',
      username: 'igbominadeveloper',
      password: 'password1'
    };
    (0, _supertest2.default)(_app2.default).post(registrationUrl).send(payload).end(function (error, response) {
      console.log(response.body);
      (0, _expect2.default)(response.body.data[0].user.firstname).toBe('Favour');
      (0, _expect2.default)(response.status).toBe(201);
      (0, _expect2.default)(response.body.data).toContainKey('token');
      (0, _expect2.default)(response.body.data[0].user.username).toBe('igbominadeveloper');
    });
    done();
  });
});