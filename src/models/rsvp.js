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
   
  }
}

export default Rsvp;
