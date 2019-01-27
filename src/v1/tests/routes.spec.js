import expect from 'expect';
import request from 'supertest';
import app from '../../../app';

const meetupsApi = '/api/v1/meetups';

describe('Routes', () => {
  it('returns a 404 response code for invalid route', () => {
    request(app)
      .get('/api')
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });

  it('returns a 200 response code for a valid route', () => {
    request(app)
      .get(meetupsApi)
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
});
