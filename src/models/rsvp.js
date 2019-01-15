import QueryBuilder from '../database/queryBuilder';
const table = 'rsvps';

class Rsvp {
  static all(meetupId) {
    const statement = `SELECT * FROM ${table} WHERE meetupId = $1`;
    return new Promise((resolve, reject) => {
	    QueryBuilder.run(statement,[meetupId])
	    .then(response => resolve(response))
	    .catch(error => reject(error))
    })
  }

  static create(rsvp) {
   	const {
   		userId,
   		meetupId,
   		status,
   		topic
   	} = rsvp;
   const statement = `INSERT INTO ${table}(userId,meetupId,topic,status) VALUES($1, $2, $3, $4)`;
   return new Promise((resolve, reject) => {
	    QueryBuilder.run(statement,[userId,meetupId,topic,status])
	    .then(response => resolve(response))
	    .catch(error => reject(error))
   })
  }
}

export default Rsvp;
