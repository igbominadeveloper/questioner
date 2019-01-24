/* eslint-disable camelcase */
import QueryBuilder from '../database/queryBuilder';
import meetup from './Meetup';

const table = 'rsvps';

class Rsvp {
  static all(meetupId) {
    const statement = `SELECT * FROM ${table} WHERE meetup_id = $1`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [meetupId])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static async create(rsvp) {
    const {
      user_id,
      meetup_id,
      status,
    } = rsvp;

    let statement = `INSERT INTO ${table}(user_id,meetup_id,status,topic) VALUES($1, $2, $3, $4) returning *`;

    const { rows } = await QueryBuilder.run(`SELECT meetup_id,user_id FROM ${table} WHERE meetup_id = $1 AND user_id = $2`, [meetup_id, user_id]);
    if (rows.length > 0) {
      statement = `UPDATE ${table} SET status=$3,topic=$4 WHERE user_id=$1 AND meetup_id=$2 returning *`;
    }
    const rsvpMeetup = await meetup.find(meetup_id);
    const { topic } = rsvpMeetup.rows[0];

    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [user_id, meetup_id, status, topic])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Rsvp;
