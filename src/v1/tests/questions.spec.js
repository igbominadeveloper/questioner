/* eslint-disable no-restricted-globals */
import expect from 'expect';
import request from 'supertest';
import app from '../../../app';

const questionApi = '/api/v1/questions';

describe('Question', () => {
  let userToken;
  let adminToken;
  let user;
  let admin;
  const id = 1000;

  const userCredentials = {
    email: 'user@questioner.com',
    password: 'password1',
  };

  const adminCredentials = {
    email: 'superadmin@questioner.com',
    password: 'password1',
  };

  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .end((error, response) => {
        expect(200);
        const { data } = response.body;
        userToken = data[0].token;
        // eslint-disable-next-line prefer-destructuring
        user = data[0].user;
      });

    request(app)
      .post('/api/v1/auth/login')
      .send(adminCredentials)
      .end((error, response) => {
        expect(200);
        const { data } = response.body;
        adminToken = data[0].token;
        // eslint-disable-next-line prefer-destructuring
        admin = data[0].user;
        done();
      });
  });

  describe('GET /api/v1/questions', () => {
    it('returns 401 when token is not set', (done) => {
      request(app)
        .get(questionApi)
        .end((_error, response) => {
          expect(401);
          expect(response.status).toBe(401);
          done();
        });
    });
    it('returns 401 response when a wrong token is set', (done) => {
      request(app)
        .get(questionApi)
        .set('x-access-token', 'jhjdhjhdjhjhjhjdhdvh')
        .end((_error, response) => {
          expect(422);
          done();
        });
    });
    it('returns 404 response and an empty array of questions', (done) => {
      request(app)
        .get(questionApi)
        .set('x-access-token', userToken)
        .end((_error, response) => {
          expect(response.status).toBe(404);
          done();
        });
    });

    it('returns 404 response and user tries to fetch a non-existing question', (done) => {
      request(app)
        .get(`${questionApi}/${id}`)
        .set('x-access-token', userToken)
        .end((_error, response) => {
          expect(response.status).toBe(404);
          done();
        });
    });
  });

  describe('POST /api/v1/questions', () => {
    it('returns a 401 error when user token is not set', (done) => {
      request(app)
        .post(questionApi)
        .end((_error, response) => {
          expect(response.status).toBe(401);
          done();
        });
    });

    it('returns a 400 error when user tries to ask question on a non-exisiting meetup', (done) => {
      const randomQuestion = {
        meetup_id: 20,
        user_id: user.id,
        title: 'My Question title',
        body: 'My Question Body',
      };

      request(app)
        .post(questionApi)
        .send(randomQuestion)
        .set('x-access-token', userToken)
        .end((_error, response) => {
          expect(404);
          expect(response.body.status).toBe(404);
          done();
        });
    });
  });

  describe('POST /api/v1/questions', () => {
    let newMeetup;
    let returnedQuestion;

    before((done) => {
      const meetupOne = {
        topic: 'Meetup for questions',
        location: 'Akure, Oloyemekun, Nigeria',
        date: '2019-10-19T11:36:38.380Z',
        organizerName: 'Igbominadeveloper',
        organizerEmail: 'favourafolayan@gmail.com',
        organizerPhone: '08135586949',
        tags: 'tag1',
        images: 'image1'
      };
      request(app)
        .post('/api/v1/meetups')
        .set('x-access-token', adminToken)
        .send(meetupOne)
        .end((_error, response) => {
          expect(201);
          const { data } = response.body;
          newMeetup = data;
          done();
        });
    });


    it('returns a 400 error when user does not put any body in the POST request', (done) => {
      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .end((_error, response) => {
          expect(400);
          expect(response.status).toBe(400);
          done();
        });
    });

    it('returns a 400 error when request body is missing a meetupId', (done) => {
      const invalidQuestionOne = {
        user_id: user.id,
        title: 'My Question title',
        body: 'Question body',
      };
      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .send(invalidQuestionOne)
        .end((_error, response) => {
          expect(400);
          expect(response.body.status).toBe(400);
          expect(response.body.error).toMatch(/meetup_id/);
          done();
        });
    });

    it('returns a 400 error when request body is missing a userId', (done) => {
      const invalidQuestionTwo = {
        meetup_id: newMeetup.id,
        title: 'My Question title',
        body: 'Question body',
      };

      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .send(invalidQuestionTwo)
        .end((_error, response) => {
          expect(400);
          expect(response.body.status).toBe(400);
          expect(response.body.error).toMatch(/user_id/);
          done();
        });
    });

    it('returns a 400 error when request body is missing a question title', (done) => {
      const invalidQuestionThree = {
        meetup_id: newMeetup.id,
        user_id: user.id,
        body: 'Question body',
      };
      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .send(invalidQuestionThree)
        .end((_error, response) => {
          expect(400);
          expect(response.body.status).toBe(400);
          expect(response.body.error).toMatch(/title/);
          done();
        });
    });

    it('returns a 400 error when request body is missing a question body', (done) => {
      const invalidQuestionFour = {
        meetup_id: newMeetup.id,
        user_id: user.id,
        title: 'My Question title',
      };
      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .send(invalidQuestionFour)
        .end((_error, response) => {
          expect(400);
          expect(response.body.status).toBe(400);
          expect(response.body.error).toMatch(/body/);
          done();
        });
    });

    it('returns a 201 response when question is created successfully', (done) => {
      const validQuestionOne = {
        meetup_id: newMeetup.id,
        user_id: user.id,
        title: 'My Question title',
        body: 'My Question body',
      };
      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .send(validQuestionOne)
        .end((_error, response) => {
          expect(201);
          expect(response.body.status).toBe(201);
          expect(response.body.data.title).toBe(validQuestionOne.title);
          expect(response.body.data.body).toBe(validQuestionOne.body);
          expect(response.body.data.meetup_id).toBe(validQuestionOne.meetup_id);
          returnedQuestion = response.body.data;
          done();
        });
    });

    it('returns a 409 error when user tries to create an existing question again', (done) => {
      const validQuestionOne = {
        meetup_id: newMeetup.id,
        user_id: user.id,
        title: 'My Question title',
        body: 'My Question body',
      };
      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .send(validQuestionOne)
        .end((_error, response) => {
          expect(409);
          expect(response.body.status).toBe(409);
          done();
        });
    });

    describe('PATCH /api/v1/questions/:id', () => {
      it('upvotes a question successfully', (done) => {
        request(app)
          .patch(`${questionApi}/${returnedQuestion.id}/upvote`)
          .set('x-access-token', userToken)
          .end((_error, response) => {
            expect(response.body.status).toBe(200);
            expect(response.body.data.upvotes).toBeGreaterThan(0);
            done();
          });
      });

      it('doesn\'t downvote past 0 marker', (done) => {
        request(app)
          .patch(`${questionApi}/${returnedQuestion.id}/downvote`)
          .set('x-access-token', userToken)
          .end((_error, response) => {
            expect(200);
            expect(response.body.data.downvotes).toBe(0);
            expect(response.body.data.upvotes).toBe(0);
            done();
          });
      });
    });
  });

  describe('GET /api/v1/questions', () => {
    it('returns an array of created questions', (done) => {
      request(app)
        .get(questionApi)
        .set('x-access-token', userToken)
        .end((_error, response) => {
          expect(200);
          expect(response.body.status).toBe(200);
          expect(response.body.data[0].length).toBeGreaterThan(0);
          done();
        });
    });
  });
});
