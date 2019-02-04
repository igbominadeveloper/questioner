/* eslint-disable camelcase */
import queryFactory from '../../database/queryFactory';


import meetup from './Meetup';

/**
 * set table constant to query except otherwise stated
 * 
 * @constant table 
 */

const table = 'rsvps';

class Rsvp {

/**
 * ---------------------------------------------------
 * Rsvp Model
 * ---------------------------------------------------
 * 
 * This Model is responsible for all 
 * database operations involving 
 * the rsvps table strictly 
*/

/**
 * select all rows for specified id
 *
 * @return {Object} Promise
*/

  static meetupRsvp(meetupId) {
    const statement = `SELECT * FROM ${table} WHERE meetup_id = $1`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [meetupId])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

/**
 * insert new row into table
 *
 * @return {Object} Promise
*/

  static async create(rsvp) {
    /**
     * use Object destructuring to extract values
     * 
     * @constant user_id
     * @constant meetupId
     * @constant status
     * @return {Object} Promise
     */

    const {
      user_id,
      meetup_id,
      status,
    } = rsvp;

    /**
     * prepare insert statement
     */

    let statement = `INSERT INTO ${table}(user_id,meetup_id,status,topic) VALUES($1, $2, $3, $4) returning *`;

    const { rows } = await queryFactory.run(`SELECT meetup_id,user_id FROM ${table} WHERE meetup_id = $1 AND user_id = $2`, [meetup_id, user_id]);
    if (rows.length > 0) {
      statement = `UPDATE ${table} SET status=$3,topic=$4 WHERE user_id=$1 AND meetup_id=$2 returning *`;
    }
    const rsvpMeetup = await meetup.find(meetup_id);
    const { topic } = rsvpMeetup.rows[0];

    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [user_id, meetup_id, status, topic])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

/**
 * export a default object
 */

export default Rsvp;
