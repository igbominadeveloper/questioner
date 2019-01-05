import expect from 'expect';
import request from 'supertest';
import app from '../app';

const meetupsApi = '/api/v1/meetups';


describe('Rsvp', () => {
  it('returns all rsvps for a meetup', () => {
    request(app)
    .get(`${meetupsApi}/1/rsvps`)
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.data.length > 0).toBe(true);
    })
  });

  it('returns an error message when meetup ID is invalid', () => {
	    request(app)
		    .post(`${meetupsApi}/2000/rsvps`)
		    .then((response) => {
		    	expect(response.body).toBe(2);
		    	expect(response.status).toBe(404);
		    })
		    .catch((error) => {
        expect(error).toBeInstanceOf(Object);
      });
	  });

  it('returns 200 when it finds the valid meetup model', () => {
    request(app)
      .get(`${meetupsApi}/1`)
      .then((response) => {
        expect(response.body.data.id).toBe(1);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Object);
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Object);
      });
  });

  it('return 400 and a custom error message when request is missing valid payload', () => {
    request(app)
      .post(`${meetupsApi}/1/rsvps`)
      .then((response) => {
        expect(response.body.error).toBe('Request must contain valid user and a status - Yes, No or Maybe');
        expect(response.body.status).toBe(400);
      });
  });

  it('returns exact rsvp status a user sends to the server', () => {
    const payload = { user: 4, status: 'Maybe' };
    request(app)
      .post(`${meetupsApi}/1/rsvps`)
      .send(payload)
      .then((response) => {
        expect(response.body.status).toBe(201);
        expect(response.body.data.status).toBe('Maybe');
      });
  });
});
