import queryFactory from '../../database/queryFactory';


import helper from '../helpers/helper';

class User {
  static authenticate(credentials) {
    const statement = 'SELECT * FROM users where email = $1';
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [credentials.email])
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  static register(credentials) {
    const statement = 'INSERT INTO users(firstname,lastname,email,password) VALUES($1,$2,$3,$4) returning *';
    const passwordHash = helper.hashPassword(credentials.password);
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [credentials.firstname, credentials.lastname, credentials.email, passwordHash])
        .then((result) => {
          const user = result.rows[0];
          const token = helper.generateToken(user.id, user.isadmin);
          resolve({ token, user });
        })
        .catch(error => reject(error));
    });
  }

  static async giveAdmin(user_id) {
    try {
      const { rows } = await queryFactory.run('UPDATE users SET isadmin = 1 WHERE id =$1 returning *', [user_id]);
      if (rows[0]) {
        const user = Object.assign({}, rows[0]);
        delete user.othername;
        delete user.username;
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        delete user.phonenumber;
        return user;
      }
      return Promise.reject({ status: 404, message: 'User doesn\'t exist' });
    } catch (error) {
      return error;
    }
  }
}

export default User;
