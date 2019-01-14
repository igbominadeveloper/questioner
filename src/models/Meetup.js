import path from 'path';
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

  static upcoming() {
    // return meetups.sort((meetup1, meetup2) => {
    //   return new Date(meetup2.happeningOn).getTime() - new Date(meetup1.happeningOn).getTime();
    // });
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

    // if (request.tags instanceof Array) {
    //   request.tags.forEach((tag) => {
    //     meetup.tags.find(item => item == tag) ? '' : meetup.tags.push(tag);
    //   });
    // } else if (request.tags == undefined) {
    //   meetup.tags = meetup.tags;
    // } else {
    //   meetup.tags.find(item => item == request.tags) ? '' : meetup.tags.push(request.tags);
    // }

    // if (request.images instanceof Array) {
    //   request.images.forEach((image) => {
    //     meetup.images.find(item => item == image) ? '' : meetup.images.push(image);
    //   });
    // } else if (request.images == undefined) {
    //   meetup.images = meetup.images;
    // } else {
    //   meetup.images.find(item => item == request.images) ? '' : meetup.images.push(request.images);
    // }

    // const index = helper.getIndex(meetups, meetup.id);
    // meetups[index] = meetup;

    // helper.writeToFile(filename, meetups);
    // return meetups[index];
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
