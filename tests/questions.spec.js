/* eslint-disable no-restricted-globals */
import expect from 'expect';
<<<<<<< HEAD
import path from 'path';
import request from 'supertest';
const questionApi = '/api/v1/questions';
import app from '../app';
=======
import question from '../src/models/Question';
>>>>>>> meetups-test

describe('Question', () => {
  it('returns all created questions', () => {
    request(app)
      .get(questionApi)
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
      })
      .catch(error => console.log(error))
  });

  it('returns a custom message when payload is not included in the request', () => {
<<<<<<< HEAD
      request(app)
        .post(questionApi)
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.body.error).toBe(`Request missing complete payload. Confirm it includes - meetup, title and the body of a question`)
        })
  });

  it('returns 201 and a question resource after creation', () => {
  	const payload = {
=======
    expect(question.create()).toBe(false);
  });

  it('can create a new question resource', () => {
    const request = {
>>>>>>> meetups-test
      meetup: 2,
      createdBy: 4,
      title: 'My Question title',
      body: 'Question body',
<<<<<<< HEAD
  	};
    request(app)
      .post(questionApi)
      .send(payload)
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body.data.title).toBe(payload.title)
        expect(response.body.data.body).toBe(payload.body)
        expect(response.body.data.meetup).toBe(payload.meetup)
      })
      .catch(error => console.log(error))
=======
    };
    expect(request).toBeInstanceOf(Object);
    expect(isNaN(parseInt(request.meetup))).toBe(false);
    expect(isNaN(parseInt(request.body))).toBe(true);
    expect(isNaN(parseInt(request.createdBy))).toBe(false);
    expect(isNaN(parseInt(request.title))).toBe(true);
    expect(question.create(request)).toBeInstanceOf(Object);
>>>>>>> meetups-test
  });

  it('should return a specific question when id is specified', () => {
      request(app)
        .get(`${questionApi}/1`)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.data.id).toBe(1)
        })
        .catch(error => console.log(error))
  });

  it('should return 404 when question ID specified is invalid', () => {
      request(app)
        .get(`${questionApi}/2000`)
        .then(response => {
          expect(response.status).toBe(404)
          expect(response.body.error).toBe(`Model Not Found`)
        })
  });

  it(`doesn't downvote past 0 marker`, () => {
  	request(app)
      .patch(`${questionApi}/1/downvote`)
      .then((response) => {
        expect(response.body.data.votes).toBe(0)
      })
  });
});