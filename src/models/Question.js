import moment from 'moment';
import QueryBuilder from '../database/queryBuilder';
import helper from '../helpers/helper';

const table = 'questions';


class Question {
  static all() {
    const statement = `SELECT * FROM ${table}`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static find(id) {
    const statement = `SELECT * FROM ${table} WHERE id = $1`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static create(payload) {
    const question = {
      title: payload.title,
      body: payload.body,
      meetup_id: payload.meetup_id,
      user_id: payload.user_id,
    };
    const statement = `INSERT INTO ${table}(title, body, meetup_id, user_id) VALUES($1, $2, $3, $4) returning *`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, Object.values(question))
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static deleteAll() {
    const statement = `DELETE * FROM ${table}`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }


  static update(questionId, request) {
    const {
      title,
      body,
    } = request;
    const statement = `UPDATE ${table} SET title=$1,body=$2 WHERE id=$3 returning *`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [
        title, body, questionId,
      ])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static delete(id) {
    const statement = `DELETE FROM ${table} WHERE id=$1`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static async createComment (payload) {
    const { user_id, question_id, topic, comment } = payload;
    const statement = `INSERT INTO comments(user_id,question_id,topic,comment) VALUES($1,$2,$3,$4) returning *`;
    return new Promise((resolve,reject) => {
      QueryBuilder.run(statement,[user_id, question_id,topic, comment])
      .then(response => resolve(response))
      .catch(error => reject(error))
    });
  }
}

export default Question;
