import expect from 'expect';
import path from 'path';
import request from 'supertest';
const questionApi = '/api/v1/questions';
import app from '../app';

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
      request(app)
        .post(questionApi)
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.body.error).toBe(`Request missing complete payload. Confirm it includes - meetup, title and the body of a question`)
        })
  });

  it('returns 201 and a question resource after creation', () => {
  	const payload = {
      meetup: 2,
      createdBy: 4,
      title: 'My Question title',
      body: 'Question body',
  	};
  	expect(payload).toBeInstanceOf(Object);
  	expect(isNaN(parseInt(payload.meetup))).toBe(false);
  	expect(isNaN(parseInt(payload.body))).toBe(true);
  	expect(isNaN(parseInt(payload.createdBy))).toBe(false);
  	expect(isNaN(parseInt(payload.title))).toBe(true);
    request(app)
      .post(questionApi)
      .send(payload)
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body.data.title).toBe(payload.title)
        expect(response.body.data.body).toBe(payload.body)
        expect(response.body.data.meetup).toBe(payload.meetup)
      })
  });

  it('should return a specific question when id is specified', () => {
      request(app)
        .get(`${questionApi}/2`)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.data.id).toBe(2)
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

  it('should always have a positive vote value', () => {
  	
  });

  it('should return the user specified')
});
