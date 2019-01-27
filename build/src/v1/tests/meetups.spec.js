'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupsApi = '/api/v1/meetups';

// eslint-disable-next-line no-undef
/* eslint-disable no-undef */
describe('Meetups', function () {
  var userToken = void 0;
  var adminToken = void 0;
  var firstInvalidMeetup = {
    topic: '',
    location: 'Ilorin, Nigeria',
    date: '2019-04-19T11:36:38.380Z'
  };

  var secondInvalidMeetup = {
    topic: 'Meetup One',
    location: '',
    date: '2019-02-19T11:36:38.380Z'
  };

  var thirdInvalidMeetup = {
    topic: 'Meetup One',
    location: 'Ilorin, Nigeria',
    date: ''
  };

  var validMeetupOne = {
    topic: 'Mocha JS Meetup',
    location: 'Ilorin,Kwara state, Nigeria',
    date: '2019-12-02T11:36:38.380Z'
  };

  var validMeetupTwo = {
    topic: 'Vue JS Meetup',
    location: 'Lagos, Nigeria',
    date: '2019-08-02T11:36:38.380Z'
  };

  var validMeetupThree = {
    topic: 'Ember JS Meetup',
    location: 'PH, Nigeria',
    date: '2019-11-02T11:36:38.380Z'
  };

  before('Login the user and admin', function (done) {
    var userCredentials = {
      email: 'user@questioner.com',
      password: 'password1'
    };

    var adminCredentials = {
      email: 'superadmin@questioner.com',
      password: 'password1'
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').send(userCredentials).end(function (error, response) {
      (0, _expect2.default)(200);
      var token = response.body.data[0].token;

      userToken = token;
    });

    (0, _supertest2.default)(_app2.default).post('/api/v1/auth/login').send(adminCredentials).end(function (error, response) {
      (0, _expect2.default)(200);
      var token = response.body.data[0].token;

      adminToken = token;
      done();
    });
  });

  describe('GET /api/v1/meetups', function () {
    it('returns 404 response code when meetups record is empty', function (done) {
      (0, _supertest2.default)(_app2.default).get(meetupsApi).set('x-access-token', userToken).end(function (error, response) {
        (0, _expect2.default)(404);
        (0, _expect2.default)(response.body.error).toMatch(/available right now/);
        done();
      });
    });
  });

  describe('POST /api/v1/meetups', function () {
    describe('response', function () {
      it('returns 401 when no user token is set', function (done) {
        (0, _supertest2.default)(_app2.default).get(meetupsApi).set('x-access-token', '').end(function (_error, response) {
          (0, _expect2.default)(401);
          var error = response.body.error;

          (0, _expect2.default)(error).toMatch(/Token not set/);
          done();
        });
      });

      it('returns a 401 error when user is unauthorized to create a meetup', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', userToken).send(validMeetupOne).end(function () {
          (0, _expect2.default)(401);
          done();
        });
      });

      it('returns 400 error if meetup topic is not set', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(firstInvalidMeetup).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body.error).toMatch(/topic/);
          done();
        });
      });

      it('returns 400 error if meetup location is not set', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(secondInvalidMeetup).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body.error).toMatch(/location/);
          done();
        });
      });

      it('returns 400 error if meetup date is not set', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(thirdInvalidMeetup).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body.error).toMatch(/date/);
          done();
        });
      });

      it('returns 200 response if meetup is created successfully', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(validMeetupOne).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body.data.topic).toBe(validMeetupOne.topic);
          (0, _expect2.default)(response.body.data.location).toBe(validMeetupOne.location);
          done();
        });
      });

      it('returns 400 error if similar meetup exists already', function (done) {
        (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(validMeetupOne).end(function (_error, response) {
          (0, _expect2.default)(400);
          (0, _expect2.default)(response.body.error).toMatch(/meetup exists/);
          done();
        });
      });
    });
  });

  describe('GET /api/v1/meetups', function () {
    it('returns 200 response code when meetups record is not empty', function (done) {
      (0, _supertest2.default)(_app2.default).get(meetupsApi).set('x-access-token', userToken).end(function (error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(response.body.data.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  var id = 1;
  var invalidId = 1000;
  describe('GET /api/v1/meetups/:id', function () {
    it('returns 200 response and a meetup record', function (done) {
      (0, _supertest2.default)(_app2.default).get(meetupsApi + '/' + id).set('x-access-token', userToken).end(function (_error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(response.body.data[0].id).toBe(id);
        done();
      });
    });
  });

  describe('GET /api/v1/meetups/upcoming', function () {
    before(function (done) {
      (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(validMeetupOne).end(function () {
        (0, _expect2.default)(201);
      });
      (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(validMeetupTwo).end(function () {
        (0, _expect2.default)(201);
      });
      (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(validMeetupThree).end(function () {
        (0, _expect2.default)(201);
        done();
      });
    });

    it('returns a sorted array of upcoming meetups', function (done) {
      (0, _supertest2.default)(_app2.default).get(meetupsApi + '/upcoming').set('x-access-token', userToken).end(function (_error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(Date.parse(response.body.data[0][0].date)).toBeLessThan(Date.parse(response.body.data[0][1].date));
        done();
      });
    });
  });

  describe('PATCH /api/v1/meetups/:id', function () {
    var meetupUpdate = {
      topic: 'New Topic',
      location: 'Abuja, Nigeria',
      date: '2019-04-19T11:36:38.380Z'
    };

    it('returns returns 401 if an unauthorized user tries to update a meetup', function (done) {
      (0, _supertest2.default)(_app2.default).patch(meetupsApi + '/' + id).set('x-access-token', userToken).end(function () {
        (0, _expect2.default)(401);
        done();
      });
    });

    it('returns an updated meetup record after successful update', function (done) {
      (0, _supertest2.default)(_app2.default).patch(meetupsApi + '/' + id).set('x-access-token', adminToken).send(meetupUpdate).end(function (_error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(response.body.data.topic).toBe(meetupUpdate.topic);
        (0, _expect2.default)(response.body.data.location).toBe(meetupUpdate.location);
        done();
      });
    });

    it('returns a 400 error when invalid meetup id is supplied', function (done) {
      (0, _supertest2.default)(_app2.default).patch(meetupsApi + '/uijkjkjkj').set('x-access-token', adminToken).send(meetupUpdate).end(function () {
        (0, _expect2.default)(400);
        done();
      });
    });

    it('returns a 404 error when admin tries to update a non-existent meetup', function (done) {
      (0, _supertest2.default)(_app2.default).patch(meetupsApi + '/' + invalidId).set('x-access-token', adminToken).send(meetupUpdate).end(function () {
        (0, _expect2.default)(404);
        done();
      });
    });
  });

  describe('DELETE /api/v1/meetups/:id', function () {
    it('throws a 401 response when token is not set', function (done) {
      (0, _supertest2.default)(_app2.default).delete(meetupsApi + '/' + id).end(function () {
        (0, _expect2.default)(401);
        done();
      });
    });

    it('throws a 400 response when the meetup specified is non-existent', function (done) {
      (0, _supertest2.default)(_app2.default).delete(meetupsApi + '/' + invalidId).set('x-access-token', adminToken).end(function () {
        (0, _expect2.default)(400);
        done();
      });
    });

    it('throws a 401 response unauthorized user tries to delete', function (done) {
      (0, _supertest2.default)(_app2.default).delete(meetupsApi + '/' + id).set('x-access-token', userToken).end(function () {
        (0, _expect2.default)(401);
        done();
      });
    });

    it('returns a 200 response when meetup is deleted', function (done) {
      (0, _supertest2.default)(_app2.default).delete(meetupsApi + '/' + id).set('x-access-token', adminToken).end(function () {
        (0, _expect2.default)(200);
        done();
      });
    });
  });

  describe('POST /meetups/:id/tags', function () {
    var meetupToBeUpdated = void 0;
    var newMeetup = {
      topic: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      location: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      date: new Date().toISOString()
    };
    before(function (done) {
      (0, _supertest2.default)(_app2.default).post(meetupsApi).send(newMeetup).set('x-access-token', adminToken).end(function (_error, response) {
        (0, _expect2.default)(200);
        meetupToBeUpdated = response.body.data;
        done();
      });
    });

    it('returns a 401 response when token is missing from the request header', function (done) {
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + id + '/tags').end(function (_error, response) {
        (0, _expect2.default)(401);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        (0, _expect2.default)(response.body.error).toMatch(/Token/);
        done();
      });
    });
    it('returns a 400 response when user is unauthorized to add tags', function (done) {
      var tags = {
        tags: 'no'
      };
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + id + '/tags').set('x-access-token', userToken).send(tags).end(function (_error, response) {
        (0, _expect2.default)(401);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        (0, _expect2.default)(response.body.status).toBe(401);
        done();
      });
    });
    it('returns a 400 response when tags passed to request body is empty string', function (done) {
      var tags = {
        tags: ''
      };
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + id + '/tags').set('x-access-token', adminToken).send(tags).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        (0, _expect2.default)(response.body.error).toMatch(/empty/);
        done();
      });
    });
    it('returns a 400 response when request body is missing tags', function (done) {
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + id + '/tags').set('x-access-token', adminToken).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        (0, _expect2.default)(response.body.error).toMatch(/tags/);
        done();
      });
    });
    it('returns a 200 response when tag is added successfully', function (done) {
      var tags = {
        tags: 'My new tag is here'
      };
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetupToBeUpdated.id + '/tags').set('x-access-token', adminToken).send(tags).end(function (_error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(response.body.status).toBe(200);
        (0, _expect2.default)(response.body.data).toHaveProperty('tags');
        (0, _expect2.default)(response.body.data.tags.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('POST /api/v1/meetups/:id/images', function () {
    var anotherNewMeetup = {
      topic: 'ReactJS Meetup',
      location: 'Styled in Lagos, Nigeria',
      date: '2019-07-02T11:36:38.380Z'
    };
    var meetupToGetImages = void 0;

    before(function (done) {
      (0, _supertest2.default)(_app2.default).post(meetupsApi).set('x-access-token', adminToken).send(anotherNewMeetup).end(function (error, response) {
        meetupToGetImages = response.body.data;
        done();
      });
    });
    it('returns a 400 response when user is unauthorized to add images', function (done) {
      var images = {
        images: 'https://my_image_url'
      };
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetupToGetImages.id + '/images').set('x-access-token', userToken).send(images).end(function (_error, response) {
        (0, _expect2.default)(401);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        (0, _expect2.default)(response.body.status).toBe(401);
        done();
      });
    });
    it('returns a 400 response when image passed to request body is empty string', function (done) {
      var images = {
        images: ''
      };
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetupToGetImages.id + '/images').set('x-access-token', adminToken).send(images).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        (0, _expect2.default)(response.body.error).toMatch(/empty/);
        done();
      });
    });
    it('returns a 400 response when request body is missing images', function (done) {
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetupToGetImages.id + '/images').set('x-access-token', adminToken).end(function (_error, response) {
        (0, _expect2.default)(400);
        (0, _expect2.default)(response.body).toHaveProperty('error');
        (0, _expect2.default)(response.body.error).toMatch(/images/);
        done();
      });
    });
    it('returns a 200 response when image is added successfully', function (done) {
      var images = {
        images: 'https://my_image_url'
      };
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetupToGetImages.id + '/images').set('x-access-token', adminToken).send(images).end(function (_error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(response.body.status).toBe(200);
        (0, _expect2.default)(response.body.data).toHaveProperty('images');
        (0, _expect2.default)(response.body.data.images.length).toBeGreaterThan(0);
        done();
      });
    });

    it('does not re-add image url if it is already existing', function (done) {
      var images = {
        images: 'https://my_image_url'
      };
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetupToGetImages.id + '/images').set('x-access-token', adminToken).send(images).end(function (_error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(response.body.status).toBe(200);
        (0, _expect2.default)(response.body.data).toHaveProperty('images');
        (0, _expect2.default)(response.body.data.images[0]).toBe(images.images);
        done();
      });
    });

    it('returns a 200 response and appends new image url to existing array', function (done) {
      var images = {
        images: 'https://my_new_image_urkkkl'
      };
      (0, _supertest2.default)(_app2.default).post(meetupsApi + '/' + meetupToGetImages.id + '/images').set('x-access-token', adminToken).send(images).end(function (_error, response) {
        (0, _expect2.default)(200);
        (0, _expect2.default)(response.body.status).toBe(200);
        (0, _expect2.default)(response.body.data).toHaveProperty('images');
        (0, _expect2.default)(response.body.data.images).toContain(images.images);
        done();
      });
    });
  });
});