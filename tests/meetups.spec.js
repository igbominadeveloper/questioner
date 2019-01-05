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
        expect(response.body.error).toBe(`Meetup doesn't exist`);
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
        expect(response.body.data.id).toBe(1);
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Object);
      });
  });

  // eslint-disable-next-line no-undef
  it('returns a newly created meetup', () => {
    const payload = {
      title: 'New title Again',
      location: 'Lagos, Nigeria',
      images: [],
      happeningOn: moment(new Date()).add(2, 'months'),
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

  it('updates a meetup correctly and returns the updated resource', () => {
    request(app)
      .get(`${meetupsApi}/1`)
      .then(response => {
        const payload = {
          title: `Get this in there`,
          happeningOn: response.body.data.happeningOn,
          location: response.body.data.location,
          tags: "new tag",
          images: "new image url"
        }
        expect(response.body.data.location).toEqual(payload.location)
        request(app)
        .patch(`${meetupsApi}/1`)
        .send(payload)
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.data.tags.length > 0).toBe(true)
          expect(response.body.data.title).toBe(payload.title)
        })
      })
  });


  it('deletes a meetup successfully', () => {
    request(app)
    .post(`${meetupsApi}/recreate`)
    .then(response => {
      request(app)
      .delete(`${meetupsApi}/1`)
      .then(response => {
        expect(response.status).toBe(204)
      })      
    })
  });
});