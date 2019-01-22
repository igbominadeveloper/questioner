/* eslint-disable no-undef */
import expect from 'expect';
import request from 'supertest';
import app from '../../app';

const meetupsApi = '/api/v1/meetups';

// eslint-disable-next-line no-undef
describe('Meetups', () => {
  let userToken;
  let adminToken;
  const firstInvalidMeetup = {
    topic: '',
    location: 'Ilorin, Nigeria',
    date: '2019-04-19T11:36:38.380Z',
  };

  const secondInvalidMeetup = {
    topic: 'Meetup One',
    location: '',
    date: '2019-02-19T11:36:38.380Z',
  };

  const thirdInvalidMeetup = {
    topic: 'Meetup One',
    location: 'Ilorin, Nigeria',
    date: '',
  };

  const validMeetupOne = {
    topic: 'Mocha JS Meetup',
    location: 'Ilorin,Kwara state, Nigeria',
    date: '2019-12-02T11:36:38.380Z',
  };

  const validMeetupTwo = {
    topic: 'Vue JS Meetup',
    location: 'Lagos, Nigeria',
    date: '2019-08-02T11:36:38.380Z',
  };

  const validMeetupThree = {
    topic: 'Ember JS Meetup',
    location: 'PH, Nigeria',
    date: '2019-11-02T11:36:38.380Z',
  };

  before('Login the user and admin', (done) => {
    const userCredentials = {
      email: 'user@questioner.com',
      password: 'password1',
    };

    const adminCredentials = {
      email: 'superadmin@questioner.com',
      password: 'password1',
    };

    request(app)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .end((error, response) => {
        expect(200);
        const { token } = response.body.data[0];
        userToken = token;
      });

    request(app)
      .post('/api/v1/auth/login')
      .send(adminCredentials)
      .end((error, response) => {
        expect(200);
        const { token } = response.body.data[0];
        adminToken = token;
        done();
      });
  });

  describe('GET /api/v1/meetups', () => {
    it('returns 404 response code when meetups record is empty', (done) => {
      request(app)
        .get(meetupsApi)
        .set('x-access-token', userToken)
        .end((error, response) => {
          expect(404);
          expect(response.body.error).toMatch(/available right now/);
          done();
        });
    });
  });

  describe('POST /api/v1/meetups', () => {
    describe('response', () => {
      it('returns 401 when no user token is set', (done) => {
        request(app)
          .get(meetupsApi)
          .set('x-access-token', '')
          .end((_error, response) => {
            expect(401);
            const { error } = response.body;
            expect(error).toMatch(/Token not set/);
            done();
          });
      });


      it('returns a 401 error when user is unauthorized to create a meetup', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', userToken)
          .send(validMeetupOne)
          .end((_error, response) => {
            expect(401);
            const { error } = response.body;
            expect(error).toMatch(/unauthorized/);
            done();
          });
      });

      it('returns 400 error if meetup topic is not set', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(firstInvalidMeetup)
          .end((_error, response) => {
            expect(400);
            expect(response.body.error).toMatch(/topic/);
            done();
          });
      });

      it('returns 400 error if meetup location is not set', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(secondInvalidMeetup)
          .end((_error, response) => {
            expect(400);
            expect(response.body.error).toMatch(/location/);
            done();
          });
      });

      it('returns 400 error if meetup date is not set', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(thirdInvalidMeetup)
          .end((_error, response) => {
            expect(400);
            expect(response.body.error).toMatch(/date/);
            done();
          });
      });


      it('returns 200 response if meetup is created successfully', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(validMeetupOne)
          .end((_error, response) => {
            expect(400);
            expect(response.body.data.topic).toBe(validMeetupOne.topic);
            expect(response.body.data.location).toBe(validMeetupOne.location);
            done();
          });
      });

      it('returns 400 error if similar meetup exists already', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(validMeetupOne)
          .end((_error, response) => {
            expect(400);
            expect(response.body.error).toMatch(/meetup exists/);
            done();
          });
      });
    });
  });

  describe('GET /api/v1/meetups', () => {
    it('returns 200 response code when meetups record is not empty', (done) => {
      request(app)
        .get(meetupsApi)
        .set('x-access-token', userToken)
        .end((error, response) => {
          expect(200);
          expect(response.body.data.length).toBeGreaterThan(0);
          done();
        });
    });
  });

  const id = 1;
  const invalidId = 1000;
  describe('GET /api/v1/meetups/:id', () => {
    it('returns 200 response and a meetup record', (done) => {
      request(app)
        .get(`${meetupsApi}/${id}`)
        .set('x-access-token', userToken)
        .end((error, response) => {
          expect(200);
          expect(response.body.data[0].id).toBe(id);
          done();
        });
    });
  });


  describe('GET /api/v1/meetups/upcoming', () => {
    before((done) => {
      request(app)
        .post(meetupsApi)
        .set('x-access-token', adminToken)
        .send(validMeetupOne)
        .end(() => {
          expect(201);
        });
      request(app)
        .post(meetupsApi)
        .set('x-access-token', adminToken)
        .send(validMeetupTwo)
        .end(() => {
          expect(201);
        });
      request(app)
        .post(meetupsApi)
        .set('x-access-token', adminToken)
        .send(validMeetupThree)
        .end(() => {
          expect(201);
          done();
        });
    });

    it('returns a sorted array of upcoming meetups', (done) => {
      request(app)
        .get(`${meetupsApi}/upcoming`)
        .set('x-access-token', userToken)
        .end((error, response) => {
          expect(200);
          expect(Date.parse(response.body.data[0][0].date))
            .toBeLessThan(Date.parse(response.body.data[0][1].date));
          done();
        });
    });
  });

  describe('PATCH /api/v1/meetups/:id', () => {
    const meetupUpdate = {
      topic: 'New Topic',
      location: 'Abuja, Nigeria',
      date: '2019-04-19T11:36:38.380Z',
    };

    it('returns returns 401 if an unauthorized user tries to update a meetup', (done) => {
      request(app)
        .patch(`${meetupsApi}/${id}`)
        .set('x-access-token', userToken)
        .end(() => {
          expect(401);
          done();
        });
    });

    it('returns an updated meetup record after successful update', (done) => {
      request(app)
        .patch(`${meetupsApi}/${id}`)
        .set('x-access-token', adminToken)
        .send(meetupUpdate)
        .end((error, response) => {
          expect(202);
          expect(response.body.data.topic).toBe(meetupUpdate.topic);
          expect(response.body.data.location).toBe(meetupUpdate.location);
          done();
        });
    });

    it('returns a 400 error when invalid meetup id is supplied', (done) => {
      request(app)
        .patch(`${meetupsApi}/uijkjkjkj`)
        .set('x-access-token', adminToken)
        .send(meetupUpdate)
        .end(() => {
          expect(400);
          done();
        });
    });

    it('returns a 404 error when admin tries to update a non-existent meetup', (done) => {
      request(app)
        .patch(`${meetupsApi}/${invalidId}`)
        .set('x-access-token', adminToken)
        .send(meetupUpdate)
        .end(() => {
          expect(404);
          done();
        });
    });
  });

  describe('DELETE /api/v1/meetups/:id', () => {
    it('throws a 401 response when token is not set', (done) => {
      request(app)
        .delete(`${meetupsApi}/${id}`)
        .end(() => {
          expect(401);
          done();
        });
    });

    it('throws a 400 response when the meetup specified is non-existent', (done) => {
      request(app)
        .delete(`${meetupsApi}/${invalidId}`)
        .set('x-access-token', adminToken)
        .end(() => {
          expect(400);
          done();
        });
    });

    it('throws a 401 response unauthorized user tries to delete', (done) => {
      request(app)
        .delete(`${meetupsApi}/${id}`)
        .set('x-access-token', userToken)
        .end(() => {
          expect(401);
          done();
        });
    });

    it('returns a 200 response when meetup is deleted', (done) => {
      request(app)
        .delete(`${meetupsApi}/${id}`)
        .set('x-access-token', adminToken)
        .end(() => {
          expect(200);
          done();
        });
    });
  });
});
