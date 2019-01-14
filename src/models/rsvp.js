import QueryBuilder from '../database/queryBuilder';

class Rsvp {
  static all(meetupId) {
    const statement = `SELECT * FROM rsvps WHERE meetupId = $1`;
    return new Promise((resolve, reject) => {
	    QueryBuilder.run(statement,[meetupId])
	    .then(response => resolve(response))
	    .catch(error => reject(error))
    })
  }

  static create(rsvp) {
    rsvps.push(rsvp);
    helper.writeToFile(filename, rsvps);
    return rsvps[rsvps.length - 1];
  }
}

export default Rsvp;
