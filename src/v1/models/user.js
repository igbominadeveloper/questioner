import queryFactory from '../../database/queryFactory';
import helper from '../helpers/helper';


class User {
/**
 * ---------------------------------------
 * User Model
 * --------------------------------------- 
 * 
 * This Model is responsible for handling
 * every database operations involving
 * the users table strictly
 */

  /**
   * select a record from users table
   * 
   * @param {Object} credentials
   * @return {Object} Promise  
   */

  static authenticate(credentials) {
    const statement = 'SELECT * FROM users where email = $1';
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [credentials.email])
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  /**
   * insert a new record into users table
   * 
   * @param {Object} credentials
   * @return {Object} Promise  
   */

  static register(credentials) {
    const statement = 'INSERT INTO users(firstname,lastname, phoneNumber,email,password) VALUES($1,$2,$3,$4,$5) returning *';
    const passwordHash = helper.hashPassword(credentials.password);
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [credentials.firstname, credentials.lastname, credentials.phoneNumber, credentials.email, passwordHash])
        .then((result) => {
          const user = result.rows[0];
          const token = helper.generateToken(user.id, user.isadmin);
          resolve({ token, user });
        })
        .catch(error => reject(error));
    });
  }


   /**
   * update the isadmin column of a record
   * 
   * @param {Object} user_id
   * @return {Object} Promise  
   */
  
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

  /**
   * select * records
   * 
   * @return {Array} response
   */
  
  static all() {
    const statement = 'SELECT id, firstname, lastname, othername, username, phonenumber FROM users';
    return new Promise((resolve, reject) => {
      queryFactory.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  }

  static find(user_id) {
    const statement = 'SELECT id, firstname, lastname, othername, username, phonenumber,email FROM users WHERE id=$1';
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [user_id])
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  }


  static update(currentProfile, request) {
    const statement = `UPDATE users SET firstname=$1, lastname=$2, othername=$3, username=$4, phonenumber=$5 WHERE id=$6 returning *`;
    const updates = {
      firstname: request.firstname || currentProfile.firstname,
      lastname: request.lastname || currentProfile.lastname,
      othername: request.othername || currentProfile.othername,
      username: request.username || currentProfile.username,
      phonenumber: request.phonenumber || currentProfile.phonenumber,
      id: parseInt(currentProfile.id),
    };
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, Object.values(updates))
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
  }
}

export default User;
