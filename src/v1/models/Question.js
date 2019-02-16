/* eslint-disable no-empty */
/* eslint-disable camelcase */
/* eslint-disable prefer-promise-reject-errors */
import queryFactory from '../../database/queryFactory';


/**
 * set table to query except specified
 * 
 * @constant table
 */

const table = 'questions';

class Question {
/**
 * ------------------------------------------------------
 * Question Model
 * ------------------------------------------------------
 * 
 * This Model is responsible for handling 
 * every database operations involving 
 * the questions table strictly 
 */


  /**
   * select all rows from questions table
   * 
   * @return {Object} Promise
   */

  static all() {
    const statement = `SELECT * FROM ${table}`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * select a single row from table
   * 
   * @param {Number} id
   * @return {Object} Promise  
   */

  static find(id) {
    const statement = `SELECT * FROM ${table} WHERE id = $1`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }


  /** 
   * Insert a new row into table
   * 
   * @param {object} payload
   * @returns {Object} Promise
  */

  static async create(payload) {
    const {
      title, body, meetup_id, user_id,
    } = payload;

    const insertQuery = `INSERT INTO ${table}(title, body, meetup_id, user_id) 
                          VALUES($1, $2, $3, $4) returning *`;
    return new Promise((resolve, reject) => {
      queryFactory.run(insertQuery, [title, body, meetup_id, user_id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

   /**
   * update a row in table
   * 
   * @param {Object} tableRow
   * @return {Object} Promise  
   */
  
  static async update(tableRow, value) {
    const statement = `UPDATE ${table} SET ${tableRow} = $1 returning *`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [value])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

   /**
   * delete a single row from table
   * 
   * @param {Number} id
   * @return {Object} Promise  
   */

  static delete(id) {
    const statement = `DELETE FROM ${table} WHERE id=$1`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

   /**
   * insert a row into comments table
   * 
   * @param {Object} payload
   * @return {Object} Promise  
   */
  
  static async createComment(payload, userId) {
    const {
      question_id, comment,
    } = payload;
    const statement = 'INSERT INTO comments(user_id,question_id,comment) VALUES($1,$2,$3) returning *';

    const { rows } = await queryFactory.run('SELECT * FROM comments WHERE user_id = $1 AND comment = $2', [userId, comment]);
    if (rows[0]) {
      return Promise.reject({ status: 422, error: 'You have submitted this comment already' });
    }

    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [userId, question_id, comment])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Question;
