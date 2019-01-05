import expect from 'expect';
import request from 'supertest';
import app from '../app';
import moment from 'moment';

const meetupsApi = '/api/v1/meetups';

// eslint-disable-next-line no-undef
describe('Meetups', () => {
  // eslint-disable-next-line no-undef
  it('returns all created meetups', () => {
    request(app)
      .post(`${meetupsApi}/recreate`)
      .then(() => {
        request(app)
          .get(meetupsApi)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
          });
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Object);
      });
  });

  // eslint-disable-next-line no-undef
  it('returns 404 when invalid meetup id is supplied', () => {
    request(app)
      .get(`${meetupsApi}/400`)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Meetup doesn\'t exist');
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Object);
      });
  });

  // eslint-disable-next-line no-undef
  it('can return a specific meetup', () => {
    request(app)
      .get(`${meetupsApi}/1`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(2);
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Object);
      });
  });

  // eslint-disable-next-line no-undef
  it('returns the created meetup after creation', () => {
    const payload = {
      title: 'New title Again',
      location: 'Lagos, Nigeria',
      images: [],
      createdOn: new Date().toLocaleString(),
      happeningOn: `${moment().add(4, 'months').calendar()}, ${moment().format('LT')}`,
      tags: [],
    };
    request(app)
      .post(meetupsApi)
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.data.title).toBe('New title Again');
      });
  });
  // eslint-disable-next-line no-undef
  it('returns an error message when the meetups array is empty', () => {
    request(app)
      .delete(`${meetupsApi}/delete`)
      .then(() => {
        request(app)
          .get(meetupsApi)
          .then((response) => {
            expect(response.body.error).toBe('No Meetups available');
            expect(response.status).toBe(404);
          })
          .catch((error) => {
            expect(error).toBeInstanceOf(Object);
          });
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Object);
      });
  });
});
