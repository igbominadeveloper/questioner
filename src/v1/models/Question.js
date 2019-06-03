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
    const statement = `
  select *,
    (
      select array_to_json(array_agg(row_to_json(c)))
      from (
        select id,comment,created_at,
        (
      select row_to_json(us)
      from (
        select id,firstname,lastname,email,username
        from users
        where id=comments.user_id
      ) us
    ) as user
        from comments
        where question_id=questions.id
      ) c
    ) as comments,
    (
      select row_to_json(u)
      from (
        select id,firstname,lastname,email,username
        from users
        where id=questions.user_id
      ) u
    ) as user
  from questions
  where meetup_id = $1
  ORDER BY questions.created_at ASC
  `
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [meetupId])
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
    
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [userId, question_id, comment.trim()])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Question;
