/* eslint-disable no-restricted-globals */
import expect from 'expect';
import request from 'supertest';
import app from '../../app';

const questionApi = '/api/v1/questions';

describe('Question', () => {
  let userToken;
  let adminToken;
  let user;
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
  });

  describe('GET /api/v1/questions', () => {
    it('returns 403 when token is not set', (done) => {
      request(app)
        .get(questionApi)
        .end((_error, response) => {
          expect(403);
          expect(response.status).toBe(403);
          done();
        });
    });
    it('returns 403 response when a wrong token is set', (done) => {
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
    it('returns a 403 error when user token is not set', (done) => {
      request(app)
        .post(questionApi)
        .end((_error, response) => {
          expect(response.status).toBe(403);
          done();
        });
    });

    it('returns a 400 error when user tries to ask question on a non-exisiting meetup', (done) => {
      const invalidQuestion = {
        meetup_id: 20,
        user_id: 1,
        title: 'My Question title',
        body: 'My Question Body',
      };

      request(app)
        .post(questionApi)
        .send(invalidQuestion)
        .set('x-access-token', userToken)
        .end((_error, response) => {
          expect(404);
          expect(response.body.status).toBe(404);
          done();
        });
    });
  });

  describe('POST /api/v1/questions', () => {
    let newMeetup = '';

    before((done) => {
      const meetupOne = {
        topic: 'Meetup for questions',
        location: 'Akure, Nigeria',
        date: '2019-04-19T11:36:38.380Z',
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

    const invalidQuestionOne = {
      user_id: user.id,
      title: 'My Question title',
      body: 'Question body',
    };
    const invalidQuestionTwo = {
      meetup_id: newMeetup.id,
      title: 'My Question title',
      body: 'Question body',
    };
    const invalidQuestionThree = {
      meetup_id: newMeetup.id,
      user_id: user.id,
      body: 'Question body',
    };

    const invalidQuestionFour = {
      meetup_id: newMeetup.id,
      user_id: user.id,
      title: 'My Question title',
    };

    const validQuestionOne = {
      meetup_id: newMeetup.id,
      user_id: user.id,
      title: 'My Question title',
      body: 'My Question body',
    };

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
      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .send(validQuestionOne)
        .end((_error, response) => {
          expect(201);
          expect(response.body.status).toBe(201);
          done();
        });
    });

    it('returns a 422 error when user tries to create an existing question again', (done) => {
      request(app)
        .post(questionApi)
        .set('x-access-token', userToken)
        .send(validQuestionOne)
        .end((_error, response) => {
          expect(422);
          expect(response.body.status).toBe(422);
          done();
        });
    });

    it('returns an array of created questions', (done) => {
      request(app)
        .get(questionApi)
        .set('x-access-token', userToken)
        .end((response) => {
          expect(200);
          console.log(response.body);
          expect(response.body[0].status).toBe(200);
          done();
        });
    });
  });
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
