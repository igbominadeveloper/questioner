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

  static withUsers(meetupId) {
    const statement = `SELECT
                        questions.id, 
                        questions.body,
                        questions.upvotes,
                        questions.downvotes,
                        questions.created_at,
                        (
                          SELECT 
                            row_to_json(users) 
                          FROM
                          (
                            SELECT 
                              firstname,
                              lastname,
                              id,
                              email 
                            FROM 
                              users 
                            WHERE 
                              ${table}.user_id = users.id) 
                            AS 
                              users) 
                              AS 
                                user 
                              FROM 
                                ${table} 
                      WHERE 
                        meetup_id = $1
                        ORDER BY questions.created_at ASC`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement,[meetupId])
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
   * @param {Object} rowColumn
   * @return {Object} Promise  
   */
  
  static async update(column, value, question_id) {
    const statement = `UPDATE ${table} SET ${column} = $1 WHERE id= $2 returning *`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [value,question_id])
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

    const { rows } = await queryFactory.run('SELECT * FROM comments WHERE user_id = $1 AND comment = $2', [userId, comment.trim()]);
    if (rows[0]) {
      return Promise.reject({ status: 422, error: 'You have submitted this comment already' });
    }
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [userId, question_id, comment.trim()])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Question;
