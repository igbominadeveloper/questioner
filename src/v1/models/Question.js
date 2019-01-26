/* eslint-disable no-empty */
/* eslint-disable camelcase */
/* eslint-disable prefer-promise-reject-errors */
import queryFactory from '../../database/queryFactory';



const table = 'questions';


class Question {
  static all() {
    const statement = `SELECT * FROM ${table}`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static find(id) {
    const statement = `SELECT * FROM ${table} WHERE id = $1`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
  /** Create a new question
   * @param {object} payload
   * @returns {Object} DB row
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

  static async update(tableRow, value) {
    const statement = `UPDATE ${table} SET ${tableRow} = $1 returning *`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [value])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static delete(id) {
    const statement = `DELETE FROM ${table} WHERE id=$1`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static async createComment(payload) {
    const {
      user_id, question_id, topic, comment,
    } = payload;
    const statement = 'INSERT INTO comments(user_id,question_id,topic,comment) VALUES($1,$2,$3,$4) returning *';

    const { rows } = await queryFactory.run('SELECT * FROM comments WHERE user_id = $1 AND comment = $2', [user_id, comment]);
    if (rows[0]) {
      return Promise.reject({ status: 422, message: 'You have submitted this comment already' });
    }

    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [user_id, question_id, topic, comment])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Question;
