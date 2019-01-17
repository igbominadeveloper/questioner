import expect from 'expect';
import request from 'supertest';
import moment from 'moment';
import app from '../../app.js';

const loginUrl = '/api/v1/auth/login';
const registrationUrl = '/api/v1/auth/signup';

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
  it('returns 404 not found response when an unregistered user tries to login', (done) => {
    request(app)
      .post(loginUrl)
      .send({ email: 'favourafolayan@gmail.com', password: 'password1' })
      .end((response, error) => {
        expect(error.body.error).toBe("User doesn't exist");
        done();
      });
  });
});

describe('POST /api/v1/auth/login', () => {
  it.only('returns 200 response when a registered user logs in with right credentials', (done) => {
    request(app)
      .post(loginUrl)
      .send({ email: 'favour@prunedge.com', password: 'password1' })
      .end((response, error) => {
        console.log(error);
        expect(response.status).toBe(200);
      });
    done();
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 400 response when user tries to register with no data', (done) => {
    request(app)
      .post(registrationUrl)
      .end((error, response) => {
        expect(response.body.error).toBe('\"firstname\" is required');
      });
    done();
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
      .end((error, response) => {
        expect(response.body.error).toBe('\"firstname\" is required');
      });
    done();
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
      .end((error, response) => {
        expect(response.body.error).toBe('\"lastname\" is required');
      });
    done();
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
      .end((error, response) => {
        expect(response.body.error).toBe('\"email\" is not allowed to be empty');
      });
    done();
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
      .end((error, response) => {
        expect(response.body.error).toBe('\"email\" must be a valid email');
      });
    done();
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 400 response when password is not included', (done) => {
    const payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      othername: 'Ajide',
      email: 'favourafolayangmail@gmail.com',
      username: 'igbominadeveloper',
      password: '',
    };
    request(app)
      .post(registrationUrl)
      .send(payload)
      .end((error, response) => {
        expect(response.body.error).toBe('\"password\" is not allowed to be empty');
      });
    done();
  });
});

describe('POST /api/v1/auth/signup', () => {
  it('returns 200 response when user registration is successful', (done) => {
    const payload = {
      firstname: 'Favour',
      lastname: 'Afolayan',
      othername: 'Ajide',
      email: 'favour@dind.com',
      username: 'igbominadeveloper',
      password: 'password1',
    };
    request(app)
      .post(registrationUrl)
      .send(payload)
      .end((error, response) => {
        expect(response.status).toBe(201);
        expect(response.body.data[0].user.firstname).toBe('Favour');
        expect(response.body.data[0].user.username).toBe('igbominadeveloper');
      });
    done();
  });
});
