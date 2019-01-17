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
      .catch(error => reject(error))
    })
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
      .catch(error => reject(error))
    })
  }

  static create(payload) {
    const meetup = {
      topic: payload.title,
      location: payload.location,
      images: payload.images ? payload.images : [],
      createdOn: moment(new Date()),
      date: payload.date,
      tags: payload.tags ? payload.tags : [],
    };
    const statement = `INSERT INTO ${table}(topic,location,images,createdOn,date,tags) VALUES($1, $2, $3, $4, $5, $6) returning *`;
    
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement,[...meetup])
      .then(response => resolve(response))
      .catch(error => reject(error))
    })
  }
  
  static deleteAll() {
    const statement = `DELETE * FROM ${table}`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement)
      .then(response => resolve(response))
      .catch(error => reject(error))
    })
  }


  static update(meetup, request) {
    const {
      topic,
      location,
      date,
    } = request;
    const statement = `UPDATE ${table} SET topic=$1,location=$2,date=$3 WHERE id=$4 returning *`;
    return new Promise((resolve, reject) => { 
      QueryBuilder.run(statement,[
        topic, location, date, meetup.id
      ])
      .then(response => resolve(response))
      .catch(error => reject(error))
    })

  }

  static delete(id) {
    const statement = `DELETE * FROM ${table} WHERE id=$1`;
    return new Promise((resolve, reject) => { 
      QueryBuilder.run(statement,[id])
      .then(response => resolve(response))
      .catch(error => reject(error))
    })
  }
}

export default Meetup;
