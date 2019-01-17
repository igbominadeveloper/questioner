import moment from 'moment';
import helper from '../helpers/helper';
import QueryBuilder from '../database/queryBuilder';

const table = 'meetups';


class Meetup {
  static all() {
    const statement = `SELECT * FROM ${table}`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static async upcoming() {
    const statement = `SELECT * FROM ${table} WHERE date > NOW()`;
    try{
      const { rows } = await QueryBuilder.run(statement);
      if (rows.length > 0 ){
        rows.sort((row1,row2) => {
          return Date.parse(row1.date) - Date.parse(row2.date);
        })
        return Promise.resolve(rows);
      }
      else{
        return Promise.reject({message: `No meetup exists`});
      }
    } catch(error){
      return Promise.reject(error)
    }
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
    const meetup = {
      topic: payload.topic,
      location: payload.location,
      date: payload.date,
      images: payload.images ? payload.images : {},
      tags: payload.tags ? payload.tags : {},
    };
    const statement = `INSERT INTO ${table}(topic,location,date,images,tags) VALUES($1, $2, $3, $4, $5) returning *`;

    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, Object.values(meetup))
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static update(meetup, request) {
    const {
      topic,
      location,
      date,
    } = request;
    const statement = `UPDATE ${table} SET topic=$1,location=$2,date=$3,updated_at=$4 WHERE id=$5 returning *`;
    const data = [
      topic || meetup.rows[0].topic,
      location || meetup.rows[0].location,
      date || meetup.rows[0].date,
      new Date().toLocaleString(),
      meetup.rows[0].id,
    ];
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, data)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static delete(meetup) {
    const statement = `DELETE FROM ${table} WHERE id=$1`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [meetup.rows[0].id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Meetup;
