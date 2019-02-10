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
    const statement = `SELECT * FROM ${table}`;
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
    const statement = `SELECT * FROM ${table} WHERE date > NOW() ORDER BY date ASC`;
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
    const statement = `SELECT * FROM ${table} WHERE id = $1`;
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
    let tags = [];
    let images = [];
    if (payload.tags instanceof Array) {
      payload.tags.forEach((tag) => {
        tags.push(tag.trim());
      });
    } else { 
      tags.push(payload.tags.trim());
    }

    if (payload.images instanceof Array) {
      payload.images.forEach((url) => {
        images.push(url.trim());
      });
    } else {
      images.push(payload.images.trim());
    }

    const meetup = [
      payload.topic,
      payload.location,
      payload.date,
      payload.organizerName,
      payload.organizerPhone,
      payload.organizerEmail,
      images,
      tags,
    ];
    const { rows } = await queryFactory.run(`SELECT topic FROM ${table} WHERE topic = $1 OR date = $2`, [meetup.topic, meetup.date]);
    if (rows[0]) {
      return Promise.reject({ status: 422, error: 'Similar meetup exists already' });
    }

    const statement = `INSERT INTO ${table}(topic, location, date, organizer_name, organizer_email, organizer_phone, images, tags) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
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
      tags = request.tags
      console.log('array');
      // request.tags.forEach((tag) => {
      //   meetup[0].tags.find(existingTag => existingTag === tag.trim()) ? '' : meetup[0].tags.push(tag.trim());
      // });
    } else if (request.tags === undefined) {
      meetup[0].tags;
    } else {
      // meetup[0].tags.find(existingTag => existingTag === request.tags.trim()) ? '' : meetup[0].tags.push(request.tags.trim());
      tags = request.tags;
      console.log('string');
    }
    // tags = meetup[0].tags;
    return tags;


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
