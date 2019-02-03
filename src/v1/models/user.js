import queryFactory from '../../database/queryFactory';


import helper from '../helpers/helper';
import QueryFactory from '../../database/queryFactory';

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

  static find(user_id) {
    const statement = 'SELECT (id, firstname, lastname, othername, username, phonenumber) FROM users WHERE id=$1';
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [user_id])
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  }


  static update(currentProfile, request) {
    const userArray = currentProfile.split(',');
    const userProfile = {
      id: userArray[0].replace('(',''),
      firstname: userArray[1] === "" ? null : userArray[1],
      lastname: userArray[2] === "" ? null : userArray[2],
      othername: userArray[3] === "" ? null : userArray[3],
      username: userArray[4] === "" ? null : userArray[4],
      phonenumber: userArray[5].replace(')', '') === "" ? null : userArray[5],
    }
    const statement = `UPDATE users SET firstname=$1, lastname=$2, othername=$3, username=$4, phonenumber=$5 WHERE id=$6 returning *`;
    const updates = {
      firstname: request.firstname || userProfile.firstname,
      lastname: request.lastname || userProfile.lastname,
      othername: request.othername || userProfile.othername,
      username: request.username || userProfile.username,
      phonenumber: request.phonenumber || userProfile.phonenumber,
      id: parseInt(userProfile.id),
    };
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, Object.values(updates))
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  }
}

export default User;
