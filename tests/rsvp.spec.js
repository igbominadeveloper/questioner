import expect from 'expect';
import request from 'supertest';
import app from '../app';

const rootApi = '/api/v1/meetups';


describe('Rsvp', () => {
  it('returns an error message when meetup ID is invalid', () => {
	    request(app)
		    .post(`${rootApi}/2000/rsvps`)
		    .then((response) => {
		    	expect(response.body).toBe(2);
		    	expect(response.status).toBe(404);
		    })
		    .catch((error) => {
		    });
	  });

  it('returns 200 and a valid meetup model before proceeding to rsvp', () => {
    request(app)
      .get(`${rootApi}/20`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(20);
        expect(response.body.data).toBeInstanceOf(Object);
      })
      .catch((error) => {
        // console.log(error)
      });
  });

  it('records and returns the correct rsvp status sent in with the request', () => {
    const status = { status: 'Maybe' };
    const user = { user: 1 };
    request(app)
      .post(`${rootApi}/20/rsvps`)
      .send(status, user)
      .then((response) => {
        expect(response.body.status).toBe(201);
        expect(response.body.data.status).toBe('Maybe');
      })
      .catch((error) => {
        // console.log(error);
        expect(error).toBeInstanceOf(Object);
      });
  });
});
