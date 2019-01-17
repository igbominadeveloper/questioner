import QueryBuilder from '../database/queryBuilder';
const table = 'rsvps';

class Rsvp {
  static all(meetupId) {
    const statement = `SELECT * FROM ${table} WHERE meetup_id = $1`;
    return new Promise((resolve, reject) => {
	    QueryBuilder.run(statement,[meetupId])
	    .then(response => resolve(response))
	    .catch(error => reject(error))
    })
  }

  static create(rsvp) {
   	const {
   		user_id,
   		meetup_id,
      topic,
   		status
   	} = rsvp;
   const statement = `INSERT INTO ${table}(user_id,meetup_id,status,topic) VALUES($1, $2, $3, $4) returning *`;
   return new Promise((resolve, reject) => {
	    QueryBuilder.run(statement,[user_id,meetup_id,status,topic])
	    .then(response => resolve(response))
	    .catch(error => reject(error))
   })
  }
}

export default Rsvp;
