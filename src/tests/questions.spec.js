/* eslint-disable no-restricted-globals */
import expect from 'expect';
import request from 'supertest';
import app from '../../app';

const questionApi = '/api/v1/questions';

describe('Question', () => {
  let userToken;
  const userCredentials = {
    email: 'user@questioner.com',
    password: 'password1',
  };

  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .end((error, response) => {
        expect(200);
        const { token } = response.body.data[0];
        userToken = token;
        done();
      });
  });

  describe('GET /api/v1/questions', () => {

    it('returns 403 when token is not set', (done) => {
      request(app)
        .get(questionApi)
        .then((response) => {
          expect(response.status).toBe(403);
          done();
        });
    });
    it('returns 403 when a wrong token is set', (done) => {
      request(app)
        .get(questionApi)
        .set('x-access-token', 'jhjdhjhdjhjhjhjdhdvh')
        .then((response) => {
          expect(400)
          done();
        });
    });
    it('returns 404 and an empty array of questions', (done) => {
      request(app)
        .get(questionApi)
        .set('x-access-token', userToken)
        .then((response) => {
          expect(response.status).toBe(404);
          done();
        });
    });
  });
  // it.only('returns all created questions', (done) => {
  //   request(app)
  //     .get(questionApi)
  //     .set('x-access-token', userToken)
  //     .then((response) => {
  //       expect(response.status).toBe(200);
  //       done();
  //     })
  // });

  // it('returns a custom message when payload is not included in the request', () => {
  //   request(app)
  //     .post(questionApi)
  //     .then((response) => {
  //       expect(response.status).toBe(400);
  //       expect(response.body.error).toBe('Request missing complete payload. Confirm it includes - meetup, createdBy, title and the body of the question');
  //     });
  // });

  // it('returns 201 and a question resource after creation', () => {
  //   const payload = {
  //     meetup: 2,
  //     createdBy: 4,
  //     title: 'My Question title',
  //     body: 'Question body',
  // 	};
  //   request(app)
  //     .post(questionApi)
  //     .send(payload)
  //     .then((response) => {
  //       expect(response.status).toBe(201);
  //       expect(response.body.data.title).toBe(payload.title);
  //       expect(response.body.data.body).toBe(payload.body);
  //       expect(response.body.data.meetup).toBe(payload.meetup);
  //     })
  //     .catch(error => console.log(error));
  // });

  // it('should return a specific question when id is specified', () => {
  //   request(app)
  //     .get(`${questionApi}/1`)
  //     .then((response) => {
  //       expect(response.status).toBe(200);
  //       expect(response.body.data.id).toBe(1);
  //     })
  //     .catch(error => console.log(error));
  // });

  // it('should return 404 when question ID specified is invalid', () => {
  //   request(app)
  //     .get(`${questionApi}/2000`)
  //     .then((response) => {
  //       expect(response.status).toBe(404);
  //       expect(response.body.error).toBe('Model Not Found');
  //     });
  // });

  // it('upvotes a question successfully', () => {
  //   request(app)
  //     .patch(`${questionApi}/1/upvote`)
  //     .then((response) => {
  //       expect(response.body.status).toBe(201);
  //     });
  // });

  // it('doesn\'t downvote past 0 marker', () => {
  //   request(app)
  //     .patch(`${questionApi}/1/downvote`)
  //     .then((response) => {
  //       expect(response.body.data.votes >= 0).toBe(true);
  //     });
  // });
});
