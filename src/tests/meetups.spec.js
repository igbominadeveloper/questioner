import expect from 'expect';
import request from 'supertest';
import moment from 'moment';
import app from '../../app.js';

const meetupsApi = '/api/v1/meetups';

// eslint-disable-next-line no-undef
describe('Meetups', () => {
  // eslint-disable-next-line no-undef
  it('returns all created meetups', () => {
    request(app)
      .get(meetupsApi)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
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
    .post(`${meetupsApi}/recreate`)
    .then(request => {
      request(app)
      .get(`${meetupsApi}/1`)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(1);
      })
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

  it('returns a 400 error when user tries to create a new meetup without request payload', () => {
    request(app)
      .post(meetupsApi)
      .then((response) => {
        expect(response.status).toBe(400);
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
      .then((response) => {
        const payload = {
          title: 'Get this in there',
          happeningOn: response.body.data.happeningOn,
          location: response.body.data.location,
          tags: 'new tag',
          images: 'new image url',
        };
        expect(response.body.data.location).toEqual(payload.location);
        request(app)
          .patch(`${meetupsApi}/1`)
          .send(payload)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.data.tags.length > 0).toBe(true);
            expect(response.body.data.title).toBe(payload.title);
          });
      });
  });

  it('returns a 404 error when user tries to update a non-existent resource', () => {
    request(app)
      .get(`${meetupsApi}/100`)
      .then((response) => {
        const payload = {
          title: 'Get this in there',
          happeningOn: new Date(),
          location: "Tanke, Ilorin",
          tags: 'new tag',
          images: 'new image url',
        };
        request(app)
          .patch(`${meetupsApi}/100`)
          .send(payload)
          .then((response) => {
            expect(response.status).toBe(404);
          });
      });
  });

  it('returns a 400 error when user tries to update without sending any request payload', () => {
    request(app)
      .get(`${meetupsApi}/1`)
      .then((response) => {
        const payload = {
          title: 'Get this in there',
          happeningOn: response.body.data.happeningOn,
          location: response.body.data.location,
          tags: 'new tag',
          images: 'new image url',
        };
        expect(response.body.data.location).toEqual(payload.location);
        request(app)
          .patch(`${meetupsApi}/1`)
          .then((response) => {
            expect(response.status).toBe(400);
          });
      });
  });

  it('deletes a meetup successfully', () => {
    request(app)
      .post(`${meetupsApi}/recreate`)
      .then((response) => {
        request(app)
          .delete(`${meetupsApi}/1`)
          .then((response) => {
            expect(response.status).toBe(204);
          });
      });
  });

  it('returns a sorted array of the latest meetups', () => {
    request(app)
      .get(`${meetupsApi}/upcoming`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(new Date(response.body.data[0].happeningOn).getTime() > new Date().getTime()).toBe(true);
      });
  });
});
