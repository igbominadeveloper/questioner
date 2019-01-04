import expect from 'expect';
import request from 'supertest';
import app from '../app';
const rootApi = '/api/v1/meetups';

describe('Meetups', () => {
  it('returns all created meetups', () => {
    request(app)
      .get(rootApi)
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
      })
      .catch(error => console.log(error))
  });

  it('returns an error message when the meetups array is empty', () => {
    request(app)
      .get(rootApi)
      .then(response => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('No Meetups available');
      })
  });


  it('returns 404 when invalid meetup id is supplied', () => {
    request(app)
      .get(`${rootApi}/400`)
      .then(response => {
        expect(response.status).toBe(404)
        expect(response.body.message).toBe(`Meetup doesn\'t exist`)
      })
      .catch(error => console.log(error))
  });

  it('can return a specific meetup', () => {
    request(app)
      .get(`${rootApi}/2`)
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(2)
      })
      .catch(error => console.log(error))
  });

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
      .post(rootApi)
      .send(payload)
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body.data).toBeInstanceOf(Object)
        expect(response.body.data.title).toBe(`New title Again`)
      })
  });

});
