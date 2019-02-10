/* eslint-disable prefer-destructuring */
import expect from 'expect';
import request from 'supertest';
import app from '../../../app';

const meetupsApi = '/api/v1/meetups';
const loginApi = '/api/v1/auth/login';


describe('Rsvp', () => {
  let meetup;
  let loggedInUser = '';
  let loggedInAdmin = '';
  before((done) => {
    request(app)
      .post(loginApi)
      .send({ email: 'user@questioner.com', password: 'password1' })
      .end((_error, response) => {
        expect(200);
        const { token, user } = response.body.data[0];
        loggedInUser = { token, user };
      });
    request(app)
      .post(loginApi)
      .send({ email: 'superadmin@questioner.com', password: 'password1' })
      .end((_error, response) => {
        expect(200);
        const { token, user } = response.body.data[0];
        loggedInAdmin = { token, user };
        done();
      });
  });
  describe('Token issue', () => {
    it('returns a 401 error when user token is not set', (done) => {
      request(app)
        .get(`${meetupsApi}/1/rsvps`)
        .end((_error, response) => {
          expect(401);
          expect(response.body).toHaveProperty('error');
          done();
        });
    });
  });

  describe('GET /meetups/:id/rsvps', () => {
    const validMeetup = {
      topic: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      location: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      date: new Date().toISOString(),
      organizerName: 'Igbominadeveloper',
      organizerEmail: 'favourafolayan@gmail.com',
      organizerPhone: '08135586949',
      tags: 'tag1',
      images: 'image1'
    };
    before((done) => {
      request(app)
        .post(meetupsApi)
        .set('x-access-token', loggedInAdmin.token)
        .send(validMeetup)
        .end((_error, response) => {
          expect(201);
          meetup = response.body.data;
          done();
        });
    });

    it('returns 404 response when there are no rsvps for a meetup', (done) => {
      request(app)
        .get(`${meetupsApi}/${meetup.id}/rsvps`)
        .set('x-access-token', loggedInAdmin.token)
        .end((_error, response) => {
          expect(404);
          expect(response.body).toHaveProperty('error');
          done();
        });
    });

    describe('POST /meetups/:id/rsvps', () => {
      it('returns a 404 response when meetup ID is not a valid integer', (done) => {
        request(app)
          .post(`${meetupsApi}/uinskjhj49894jihj/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .end((_error, response) => {
            expect(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toMatch(/integer/);
            done();
          });
      });

      it('returns a 400 response when request status is missing from the request', (done) => {
        request(app)
          .post(`${meetupsApi}/${meetup.id}/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .end((_error, response) => {
            expect(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toMatch(/status/);
            done();
          });
      });

      it('returns a 400 response when request status is an empty string', (done) => {
        request(app)
          .post(`${meetupsApi}/${meetup.id}/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .send({ status: '' })
          .end((_error, response) => {
            expect(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toMatch(/empty/);
            done();
          });
      });

      it('returns a 400 response when request status is not one of yes, no or maybe', (done) => {
        request(app)
          .post(`${meetupsApi}/${meetup.id}/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .send({ status: 'Hell No' })
          .end((_error, response) => {
            expect(400);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toMatch(/yes, no, maybe/);
            done();
          });
      });

      it('returns a 404 response when the meetup ID specified does not exist', (done) => {
        request(app)
          .post(`${meetupsApi}/90000/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .send({ status: 'no' })
          .end((_error, response) => {
            expect(404);
            expect(response.body.status).toBe(404);
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toMatch(/exist/);
            done();
          });
      });

      it('returns 201 response when user rsvp is received', (done) => {
        const status = 'no';
        request(app)
          .post(`${meetupsApi}/${meetup.id}/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .send({ status })
          .end((_error, response) => {
            expect(201);
            expect(response.body.data.status).toBe(status);
            done();
          });
      });

      it('returns 201 response and returns maybe rsvp when a user changes status to maybe', (done) => {
        const status = 'maybe';
        request(app)
          .post(`${meetupsApi}/${meetup.id}/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .send({ status })
          .end((_error, response) => {
            expect(201);
            expect(response.body.data.status).toBe(status);
            done();
          });
      });

      it('returns 201 response and return yes when a user changes status to yes', (done) => {
        const status = 'yes';
        request(app)
          .post(`${meetupsApi}/${meetup.id}/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .send({ status })
          .end((_error, response) => {
            expect(201);
            expect(response.body.data.status).toBe(status);
            done();
          });
      });
    });

    describe('GET /api/v1/meetups:id/rsvps', () => {
      it('returns 401 response when a non-admin tries to fetch rsvps for a meetup', (done) => {
        request(app)
          .get(`${meetupsApi}/${meetup.id}/rsvps`)
          .set('x-access-token', loggedInUser.token)
          .end((_error, response) => {
            expect(401);
            expect(response.body).toHaveProperty('error');
            done();
          });
      });

      it('returns 200 response and an array of rsvps for a specified meetup', (done) => {
        request(app)
          .get(`${meetupsApi}/${meetup.id}/rsvps`)
          .set('x-access-token', loggedInAdmin.token)
          .end((_error, response) => {
            expect(200);
            expect(response.body.data.length).toBeGreaterThan(0);
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
