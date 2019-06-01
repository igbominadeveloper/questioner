import queryFactory from '../../database/queryFactory';

/**
 * set table to query except when specified
 * 
 * @constant table 
 */

const table = 'meetups';

class Meetup {
/**
 * ---------------------------------------------------
 * Meetup Model
 * ---------------------------------------------------
 * 
 * This Model is responsible for all 
 * database operations involving 
 * the meetups table  
 */


  /**
   * select all rows from meetups table
   * 
   * @return {Object} Promise
   */

  static all() {
    const statement = `SELECT * FROM meetups`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /** 
   * select all rows where column date > NOW()
   * 
   * @return {Object} Promise 
  */

  static upcoming() {
    const statement = `SELECT * FROM ${table} WHERE date > NOW() ORDER BY date DESC LIMIT 10`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * select a single row
   * 
   * @param {Number} id 
   * @return {Object} Promise
   */

  static find(id) {
    const statement =  `SELECT "meetup"."id", "meetup"."topic", "meetup"."location","meetup"."organizer_name","meetup"."topic","meetup"."topic","meetup"."organizer_phone","meetup"."organizer_email","meetup"."date","meetup"."images","meetup"."tags","question"."id" AS "question.id", "question"."title" AS "question.title" FROM "meetups" AS "meetup" LEFT OUTER JOIN "questions" AS "question" ON "meetup"."id" = "question"."meetup_id" WHERE "meetup"."id" = $1;`
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * Insert a new row into meetups table
   * 
   * @param {Object} payload
   * @return {Object} Promise
   */

  static async create(payload) {
    const { rows } = await queryFactory.run(`SELECT * FROM ${table} WHERE topic = $1 AND date = $2`, [payload.topic, payload.date]);
    if (rows.length > 0) {
      return Promise.reject({ status: 422, error: 'Similar meetup exists already' });
    }

    let tags = [];
    let images = [];

    if (payload.tags !== undefined) {
      if (payload.tags instanceof Array) {
        payload.tags.forEach((tag) => {
          tags.push(tag.trim());
        });
      } else if (payload.tags !== '') {
        tags.push(payload.tags.trim());
      }
    }
    
    if (payload.images !== undefined) {  
      if (payload.images instanceof Array) {
        payload.images.forEach((url) => {
          images.push(url.trim());
        });
      } else if(payload.images !== ''){
        images.push(payload.images.trim());
      }
    }

    const meetup = [
      payload.topic,
      payload.location,
      payload.date,
      payload.description,
      payload.organizerName,
      payload.organizerEmail,
      payload.organizerPhone,
      images,
      tags,
    ];

    const statement = `INSERT INTO ${table}(topic, location, date,description, organizer_name, organizer_email, organizer_phone, images, tags) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement,[...meetup])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * update a single row with request data
   * 
   * @param {Object} meetup 
   * @param {Object} request 
   * @return {Object} Promise
   */

  static update(meetup, request) {
    const {
      topic,
      location,
      date,
    } = request;

    const statement = `UPDATE ${table} SET topic=$1, location=$2, date=$3, tags=$4, images=$5 WHERE id=$6 returning *`;
    let tags;
    let images;
    if (request.tags instanceof Array) {
      request.tags.forEach((tag) => {
        meetup[0].tags.find(existingTag => existingTag === tag.trim()) ? '' : meetup[0].tags.push(tag.trim());
      });
    } else if (request.tags === undefined) {
      meetup[0].tags;
    } else {
      meetup[0].tags.find(existingTag => existingTag === request.tags.trim()) ? '' : meetup[0].tags.push(request.tags.trim());
      tags = request.tags;
    }
    tags = meetup[0].tags;

    if (request.images instanceof Array) {
      request.images.forEach((url) => {
        meetup[0].images.find(existingUrl => existingUrl === url.trim()) ? '' : meetup[0].images.push(url.trim());
      });
    } else if (request.images === undefined) {
      meetup[0].images = meetup[0].images;
    } else {
      meetup[0].images.find(existingUrl => existingUrl === request.images.trim()) ? '' : meetup[0].images.push(request.images.trim());
    }
    images = meetup[0].images;


    const data = [
      topic || meetup[0].topic,
      location || meetup[0].location,
      date || meetup[0].date,
      tags = request.tags ? tags : meetup[0].tags,
      images = request.images ? images : meetup[0].images,
      meetup[0].id,
    ];

    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [...data])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * delete a single row from table
   * 
   * @param {Array} meetup
   * @return {Object} Promise 
   */
  
  static delete(meetup) {
    const statement = `DELETE FROM ${table} WHERE id=$1`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [meetup.rows[0].id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Meetup;
