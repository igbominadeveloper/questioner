import expect from 'expect';
import request from 'supertest';
import app from '../app';

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
      .catch(error => console.log(error));
  });
  // eslint-disable-next-line no-undef
  it.only('returns an error message when the meetups array is empty', () => {
    request(app)
      .delete(`${meetupsApi}/delete`)
      .then(() => {
        request(app)
          .get(meetupsApi)
          .then((response) => {
            expect(response.body).toBe('No Meetups available');
            expect(response.status).toBe(404);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  });


  // eslint-disable-next-line no-undef
  it('returns 404 when invalid meetup id is supplied', () => {
    request(app)
      .get(`${meetupsApi}/400`)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Meetup doesn\'t exist');
      })
      .catch(error => console.log(error));
  });

  // eslint-disable-next-line no-undef
  it('can return a specific meetup', () => {
    request(app)
      .get(`${meetupsApi}/2`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(2);
      })
      .catch(error => (error));
  });

  // eslint-disable-next-line no-undef
  it('returns the created meetup after creation', () => {
    const payload = {
      title: 'New title Again',
      location: 'Lagos, Nigeria',
      images: [],
      createdOn: new Date().toLocaleString(),
      happeningOn: '21-02-2019',
      tags: [],
    };
    request(app)
      .post(meetupsApi)
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.data).toBeInstanceOf(Object);
        expect(response.body.data.title).toBe('New title Again');
      });
  });
});
