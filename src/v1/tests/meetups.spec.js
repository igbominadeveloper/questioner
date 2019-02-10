/* eslint-disable no-undef */
import expect from 'expect';
import request from 'supertest';
import app from '../../../app';

const meetupsApi = '/api/v1/meetups';

// eslint-disable-next-line no-undef
describe('Meetups', () => {
  let userToken;
  let adminToken;
  const firstInvalidMeetup = {
    topic: '',
    location: 'Ilorin, Nigeria',
    date: '2019-04-19T11:36:38.380Z',
    organizerName: 'Igbominadeveloper',
    organizerEmail: 'favourafolayan@gmail.com',
    organizerPhone: '08135586949',
    tags:'tag1',
    images: 'image1'
  };

  const secondInvalidMeetup = {
    topic: 'Meetup One',
    location: '',
    date: '2019-02-19T11:36:38.380Z',
    organizerName: 'Igbominadeveloper',
    organizerEmail: 'favourafolayan@gmail.com',
    organizerPhone: '08135586949',
    tags:'tag1',
    images: 'image1'
  };

  const thirdInvalidMeetup = {
    topic: 'Meetup One',
    location: 'Ilorin, Nigeria',
    date: '',
    organizerName: 'Igbominadeveloper',
    organizerEmail: 'favourafolayan@gmail.com',
    organizerPhone: '08135586949',
    tags:'tag1',
    images: 'image1'
  };

  const validMeetupOne = {
    topic: 'Mocha JS Meetup',
    location: 'Ilorin,Kwara state, Nigeria',
    date: '2019-12-02T11:36:38.380Z',
    organizerName: 'Igbominadeveloper',
    organizerEmail: 'favourafolayan@gmail.com',
    organizerPhone: '08135586949',
    tags:'tag1',
    images: 'image1'
  };

  const validMeetupTwo = {
    topic: 'Vue JS Meetup',
    location: 'Lagos, Nigeria',
    date: '2019-08-02T11:36:38.380Z',
    organizerName: 'Igbominadeveloper',
    organizerEmail: 'favourafolayan@gmail.com',
    organizerPhone: '08135586949',
    tags:'tag1',
    images: 'image1'
  };

  const validMeetupThree = {
    topic: 'Ember JS Meetup',
    location: 'PH, Nigeria',
    date: '2019-11-02T11:36:38.380Z',
    organizerName: 'Igbominadeveloper',
    organizerEmail: 'favourafolayan@gmail.com',
    organizerPhone: '08135586949',
    tags:'tag1',
    images: 'image1'
  };

  before('Login the user and admin', (done) => {
    const userCredentials = {
      email: 'user@questioner.com',
      password: 'password1',
    };

    const adminCredentials = {
      email: 'superadmin@questioner.com',
      password: 'password1',
    };

    request(app)
      .post('/api/v1/auth/login')
      .send(userCredentials)
      .end((error, response) => {
        expect(200);
        const { token } = response.body.data[0];
        userToken = token;
      });

    request(app)
      .post('/api/v1/auth/login')
      .send(adminCredentials)
      .end((error, response) => {
        expect(200);
        const { token } = response.body.data[0];
        adminToken = token;
        done();
      });
  });

  describe('GET /api/v1/meetups', () => {
    it('returns 404 response code when meetups record is empty', (done) => {
      request(app)
        .get(meetupsApi)
        .set('x-access-token', userToken)
        .end((error, response) => {
          expect(404);
          expect(response.body.error).toMatch(/available right now/);
          done();
        });
    });
  });

  describe('POST /api/v1/meetups', () => {
    describe('response', () => {
      it('returns 401 when no user token is set', (done) => {
        request(app)
          .get(meetupsApi)
          .set('x-access-token', '')
          .end((_error, response) => {
            expect(401);
            const { error } = response.body;
            expect(error).toMatch(/Token not set/);
            done();
          });
      });


      it('returns a 401 error when user is unauthorized to create a meetup', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', userToken)
          .send(validMeetupOne)
          .end(() => {
            expect(401);
            done();
          });
      });

      it('returns 400 error if meetup topic is not set', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(firstInvalidMeetup)
          .end((_error, response) => {
            expect(400);
            expect(response.body.error).toMatch(/topic/);
            done();
          });
      });

      it('returns 400 error if meetup location is not set', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(secondInvalidMeetup)
          .end((_error, response) => {
            expect(400);
            expect(response.body.error).toMatch(/location/);
            done();
          });
      });

      it('returns 400 error if meetup date is not set', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(thirdInvalidMeetup)
          .end((_error, response) => {
            expect(400);
            expect(response.body.error).toMatch(/date/);
            done();
          });
      });


      it('returns 200 response if meetup is created successfully', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(validMeetupOne)
          .end((_error, response) => {
            expect(400);
            expect(response.body.data.topic).toBe(validMeetupOne.topic);
            expect(response.body.data.location).toBe(validMeetupOne.location);
            done();
          });
      });

      it('returns 400 error if similar meetup exists already', (done) => {
        request(app)
          .post(meetupsApi)
          .set('x-access-token', adminToken)
          .send(validMeetupOne)
          .end((_error, response) => {
            expect(400);
            expect(response.body.error).toMatch(/meetup exists/);
            done();
          });
      });
    });
  });

  describe('GET /api/v1/meetups', () => {
    it('returns 200 response code when meetups record is not empty', (done) => {
      request(app)
        .get(meetupsApi)
        .set('x-access-token', userToken)
        .end((error, response) => {
          expect(200);
          expect(response.body.data.length).toBeGreaterThan(0);
          done();
        });
    });
  });

  const id = 1;
  const invalidId = 1000;
  describe('GET /api/v1/meetups/:id', () => {
    it('returns 200 response and a meetup record', (done) => {
      request(app)
        .get(`${meetupsApi}/${id}`)
        .set('x-access-token', userToken)
        .end((_error, response) => {
          expect(200);
          expect(response.body.data[0].id).toBe(id);
          done();
        });
    });
  });


  describe('GET /api/v1/meetups/upcoming', () => {
    before((done) => {
      request(app)
        .post(meetupsApi)
        .set('x-access-token', adminToken)
        .send(validMeetupOne)
        .end(() => {
          expect(201);
        });
      request(app)
        .post(meetupsApi)
        .set('x-access-token', adminToken)
        .send(validMeetupTwo)
        .end(() => {
          expect(201);
        });
      request(app)
        .post(meetupsApi)
        .set('x-access-token', adminToken)
        .send(validMeetupThree)
        .end(() => {
          expect(201);
          done();
        });
    });

    it('returns a sorted array of upcoming meetups', (done) => {
      request(app)
        .get(`${meetupsApi}/upcoming`)
        .set('x-access-token', userToken)
        .end((_error, response) => {
          expect(200);
          expect(Date.parse(response.body.data[0][0].date))
            .toBeLessThan(Date.parse(response.body.data[0][1].date));
          done();
        });
    });
  });

  describe('PATCH /api/v1/meetups/:id', () => {
    const meetupUpdate = {
      topic: 'New Topic',
      location: 'Abuja, Nigeria',
      date: '2019-04-19T11:36:38.380Z',
    };

    it('returns returns 401 if an unauthorized user tries to update a meetup', (done) => {
      request(app)
        .patch(`${meetupsApi}/${id}`)
        .set('x-access-token', userToken)
        .end(() => {
          expect(401);
          done();
        });
    });

    it('returns an updated meetup record after successful update', (done) => {
      request(app)
        .patch(`${meetupsApi}/${id}`)
        .set('x-access-token', adminToken)
        .send(meetupUpdate)
        .end((_error, response) => {
          expect(200);
          expect(response.body.data.topic).toBe(meetupUpdate.topic);
          expect(response.body.data.location).toBe(meetupUpdate.location);
          done();
        });
    });

    it('returns a 400 error when invalid meetup id is supplied', (done) => {
      request(app)
        .patch(`${meetupsApi}/uijkjkjkj`)
        .set('x-access-token', adminToken)
        .send(meetupUpdate)
        .end(() => {
          expect(400);
          done();
        });
    });

    it('returns a 404 error when admin tries to update a non-existent meetup', (done) => {
      request(app)
        .patch(`${meetupsApi}/${invalidId}`)
        .set('x-access-token', adminToken)
        .send(meetupUpdate)
        .end(() => {
          expect(404);
          done();
        });
    });
  });

  describe('DELETE /api/v1/meetups/:id', () => {
    it('throws a 401 response when token is not set', (done) => {
      request(app)
        .delete(`${meetupsApi}/${id}`)
        .end(() => {
          expect(401);
          done();
        });
    });

    it('throws a 400 response when the meetup specified is non-existent', (done) => {
      request(app)
        .delete(`${meetupsApi}/${invalidId}`)
        .set('x-access-token', adminToken)
        .end(() => {
          expect(400);
          done();
        });
    });

    it('throws a 401 response unauthorized user tries to delete', (done) => {
      request(app)
        .delete(`${meetupsApi}/${id}`)
        .set('x-access-token', userToken)
        .end(() => {
          expect(401);
          done();
        });
    });

    it('returns a 200 response when meetup is deleted', (done) => {
      request(app)
        .delete(`${meetupsApi}/${id}`)
        .set('x-access-token', adminToken)
        .end(() => {
          expect(200);
          done();
        });
    });
  });

  describe('POST /meetups/:id/tags', () => {
    let meetupToBeUpdated;
    const newMeetup = {
      topic: Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15),
      location: Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15),
      date: new Date().toISOString(),
      organizerName: 'Igbominadeveloper',
      organizerEmail: 'favourafolayan@gmail.com',
      organizerPhone: '08135586949',
      tags:'tag1',
      images: 'image1'
    };
    before((done) => {
      request(app)
        .post(meetupsApi)
        .send(newMeetup)
        .set('x-access-token', adminToken)
        .end((_error, response) => {
          expect(200);
          meetupToBeUpdated = response.body.data;
          done();
        });
    });

    it('returns a 401 response when token is missing from the request header', (done) => {
      request(app)
        .post(`${meetupsApi}/${meetupToBeUpdated.id}/tags`)
        .end((_error, response) => {
          expect(401);
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toMatch(/Token/);
          done();
        });
    });
    it('returns a 400 response when user is unauthorized to add tags', (done) => {
      const tags = {
        tags: 'New tag here',
      };
      request(app)
        .post(`${meetupsApi}/${meetupToBeUpdated.id}/tags`)
        .set('x-access-token', userToken)
        .send(tags)
        .end((error, response) => {
          expect(401);
          expect(response.body).toHaveProperty('error');
          expect(response.body.status).toBe(401);
          done();
        });
    });
    it('returns a 400 response when tags passed to request body is empty string', (done) => {
      const tags = {
        tags: '',
      };
      request(app)
        .post(`${meetupsApi}/${meetupToBeUpdated.id}/tags`)
        .set('x-access-token', adminToken)
        .send(tags)
        .end((_error, response) => {
          expect(400);
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toMatch(/empty/);
          done();
        });
    });
    it('returns a 400 response when request body is missing tags', (done) => {
      request(app)
        .post(`${meetupsApi}/${meetupToBeUpdated.id}/tags`)
        .set('x-access-token', adminToken)
        .end((_error, response) => {
          expect(400);
          expect(response.body).toHaveProperty('error');
          done();
        });
    });
    it('returns a 200 response when tag is added successfully', (done) => {
      const tags = {
        tags: 'My new tag is here',
      };
      request(app)
        .post(`${meetupsApi}/${meetupToBeUpdated.id}/tags`)
        .set('x-access-token', adminToken)
        .send(tags)
        .end((_error, response) => {
          expect(200);
          expect(response.body.status).toBe(200);
          expect(response.body.data).toHaveProperty('tags');
          expect(response.body.data.tags.length).toBeGreaterThan(0);
          done();
        });
    });
  });

  describe('POST /api/v1/meetups/:id/images', () => {
    const anotherNewMeetup = {
      topic: 'ReactJS Meetup',
      location: 'Styled in Lagos, Nigeria',
      date: '2019-07-02T11:36:38.380Z',
      organizerName: 'Igbominadeveloper',
      organizerEmail: 'favourafolayan@gmail.com',
      organizerPhone: '08135586949',
      tags:'tag1',
      images: 'image1'
    };
    let meetupToGetImages;

    before((done) => {
      request(app)
        .post(meetupsApi)
        .set('x-access-token', adminToken)
        .send(anotherNewMeetup)
        .end((error, response) => {
          meetupToGetImages = response.body.data;
          done();
        });
    });
    it('returns a 400 response when user is unauthorized to add images', (done) => {
      const images = {
        images: 'https://my_image_url',
      };
      request(app)
        .post(`${meetupsApi}/${meetupToGetImages.id}/images`)
        .set('x-access-token', userToken)
        .send(images)
        .end((_error, response) => {
          expect(401);
          expect(response.body).toHaveProperty('error');
          expect(response.body.status).toBe(401);
          done();
        });
    });
    it('returns a 400 response when image passed to request body is empty string', (done) => {
      const images = {
        images: '',
      };
      request(app)
        .post(`${meetupsApi}/${meetupToGetImages.id}/images`)
        .set('x-access-token', adminToken)
        .send(images)
        .end((_error, response) => {
          expect(400);
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toMatch(/empty/);
          done();
        });
    });
    it('returns a 400 response when request body is missing images', (done) => {
      request(app)
        .post(`${meetupsApi}/${meetupToGetImages.id}/images`)
        .set('x-access-token', adminToken)
        .end((_error, response) => {
          expect(400);
          expect(response.body).toHaveProperty('error');
          done();
        });
    });
    it('returns a 200 response when image is added successfully', (done) => {
      const images = {
        images: 'https://my_image_url',
      };
      request(app)
        .post(`${meetupsApi}/${meetupToGetImages.id}/images`)
        .set('x-access-token', adminToken)
        .send(images)
        .end((_error, response) => {
          expect(200);
          expect(response.body.status).toBe(200);
          expect(response.body.data).toHaveProperty('images');
          expect(response.body.data.images.length).toBeGreaterThan(1);
          done();
        });
    });

    it('returns a 200 response and appends new image url to existing array', (done) => {
      const images = {
        images: 'https://my_new_image_urkkkl',
      };
      request(app)
        .post(`${meetupsApi}/${meetupToGetImages.id}/images`)
        .set('x-access-token', adminToken)
        .send(images)
        .end((_error, response) => {
          expect(200);
          expect(response.body.status).toBe(200);
          expect(response.body.data).toHaveProperty('images');
          expect(response.body.data.images).toContain(images.images);
          done();
        });
    });
  });
});
