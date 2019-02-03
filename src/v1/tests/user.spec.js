import expect from 'expect';
import request from 'supertest';
import app from '../../../app';

const loginUrl = '/api/v1/auth/login';
const registrationUrl = '/api/v1/auth/signup';
const profileUrl = '/api/v1/users';

describe('POST /api/v1/auth/login', () => {
  it('returns 400 response when user tries to login without any credentials', (done) => {
    request(app)
      .post(loginUrl)
      .expect(400, done);
  });
});



describe('POST /api/v1/auth/login', () => {
  it('returns 400 response when user tries to login with incomplete post data', (done) => {
    request(app)
      .post(loginUrl)
      .send({ email: 'favourafolayan@gmail.com' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data);
        done();
      });
  });
});

describe('POST /api/v1/auth/login', () => {
  it('returns 404 response when an unregistered user tries to login', (done) => {
    request(app)
      .post(loginUrl)
      .send({ email: 'favourafolayan@gmail.com', password: 'password1' })
      .end((_response, error) => {
        expect(error.body.error).toBe('User not found');
        expect(error.body.status).toBe(404);
        done();
      });
  });
});

let registeredUser;
let token;

before((done) => {
  const userData = {
    firstname: 'Freeze',
    lastname: 'Test User',
    email: 'afolayan@tech4dev.com',
    password: 'password1',
  };
  request(app)
    .post(registrationUrl)
    .send(userData)
    .end((_error, response) => {
      registeredUser = response.body.data[0].user;
      done();
    });
});

describe('POST /api/v1/auth/login', () => {
  it('returns 200 response when a registered user logs in with right credentials', (done) => {
    request(app)
      .post(loginUrl)
      .send({ email: 'afolayan@tech4dev.com', password: 'password1' })
      .end((_error, response) => {
        expect(response.body.status).toBe(200);
        expect(response.body.data[0].user.email).toBe('afolayan@tech4dev.com');
        expect(response.body.data[0].user.firstname).toBe('Freeze');
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 400 response when user tries to register with no data', (done) => {
    request(app)
      .post(registrationUrl)
      .end((_error, response) => {
        expect(response.body.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 400 response when firstname is not filled', (done) => {
    const payload = {
      lastname: 'Afolayan',
      othername: 'Ajide',
      email: 'favourafolayan@gmail.com',
      username: 'igbominadeveloper',
      password: 'password1',
    };
    request(app)
      .post(registrationUrl)
      .send(payload)
      .end((_error, response) => {
        expect(400);
        expect(response.body.error).toMatch(/firstname/);
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 400 response when lastname is not filled', (done) => {
    const payload = {
      firstname: 'Favour',
      othername: 'Ajide',
      email: 'favourafolayan@gmail.com',
      username: 'igbominadeveloper',
      password: 'password1',
    };
    request(app)
      .post(registrationUrl)
      .send(payload)
      .end((_error, response) => {
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toMatch(/lastname/);
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 400 response when email is not filled', (done) => {
    const payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      othername: 'Ajide',
      email: '',
      username: 'igbominadeveloper',
      password: 'password1',
    };
    request(app)
      .post(registrationUrl)
      .send(payload)
      .end((_error, response) => {
        expect(400);
        expect(response.body.status).toBe(400);
        expect(response.body.error).toMatch(/email/);
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 400 response when email is not a valid email', (done) => {
    const payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      othername: 'Ajide',
      email: 'favourafolayangmail',
      username: 'igbominadeveloper',
      password: 'password1',
    };
    request(app)
      .post(registrationUrl)
      .send(payload)
      .end((_error, response) => {
        expect(400);
        expect(response.body.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toMatch(/valid email/);
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 400 response when password is not included', (done) => {
    const payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      email: 'favourafolayangmail@gmail.com',
      username: 'igbominadeveloper',
      password: '',
    };
    request(app)
      .post(registrationUrl)
      .send(payload)
      .end((_error, response) => {
        expect(400);
        expect(response.body.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toMatch(/password/);
        done();
      });
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 200 response when user registration is successful', (done) => {
    const payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      email: 'favour@dind.com',
      username: 'igbominadeveloper',
      password: 'password1',
    };
    request(app)
      .post(registrationUrl)
      .send(payload)
      .end((_error, response) => {
        expect(201);
        expect(response.status).toBe(201);
        expect(response.body.data[0]).toHaveProperty('token');
        expect(response.body.data[0]).toHaveProperty('user');
        expect(response.body.data[0].user).toHaveProperty('firstname');
        expect(response.body.data[0].user).toHaveProperty('username');
        expect(response.body.data[0].user.firstname).toBe(payload.firstname);
        expect(response.body.data[0].user.username).toBe(payload.username);
        done();
      });
  });
});


describe('PATCH /api/v1/user/:id', () => {
  let token;
  let user;

  before((done) => {
    request(app)
      .post(loginUrl)
      .send({ email: 'user@questioner.com', password: 'password1' })
      .end((_error, response) => {
        expect(200);
        user = response.body.data[0].user;
        token = response.body.data[0].token;
        done();
      });
  });

  it('returns a 401 response when token is missing', (done) => {
    const updatedRecord = {
      firstname: 'My New firstname',
      lastname: 'My New lastname',
      othername: 'My New othername',
    };
    request(app)
      .patch(`${profileUrl}/${user.id}`)
      .send(updatedRecord)
      .end((_error, response) => {
        expect(401);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toMatch(/Token/);
        done();
        });
  })

  it('returns a 400 response when invalid token is suppliedk', (done) => {
    const updatedRecord = {
      firstname: 'My New firstname',
      lastname: 'My New lastname',
      othername: 'My New othername',
    };
    request(app)
      .patch(`${profileUrl}/${user.id}`)
      .send(updatedRecord)
      .set('x-access-token','hggdu8489bnbh4')
      .end((_error, response) => {
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).tokMatch(/malformed/);
        done();
        });
  })
  it('returns a 200 response when profile update is successful', (done) => {
    const updatedRecord = {
      firstname: 'My New firstname',
      lastname: 'My New lastname',
      othername: 'My New othername',
    };
    request(app)
      .patch(`${profileUrl}/${user.id}`)
      .send(updatedRecord)
      .set('x-access-token', token)
      .end((_error, response) => {
        expect(200);
        expect(response.body.status).toBe(200);
        expect(response.body.data).toHaveProperty('firstname');
        expect(response.body.data).toHaveProperty('lastname');
        expect(response.body.data).toHaveProperty('othername');
        expect(response.body.data.firstname).toBe(updatedRecord.firstname);
        expect(response.body.data.lastname).toBe(updatedRecord.lastname);
        expect(response.body.data.othername).toBe(updatedRecord.othername);
        done();
        });
  })
});
