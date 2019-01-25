import QueryBuilder from '../database/queryBuilder';

const table = 'meetups';


class Meetup {
  static all() {
    const statement = `SELECT * FROM ${table}`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static upcoming() {
    const statement = `SELECT * FROM ${table} WHERE date > NOW() ORDER BY date ASC`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static find(id) {
    const statement = `SELECT * FROM ${table} WHERE id = $1`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static async create(payload) {
    const meetup = {
      topic: payload.topic,
      location: payload.location,
      date: payload.date,
      images: payload.images ? payload.images : {},
      tags: payload.tags ? payload.tags : {},
    };
    const { rows } = await QueryBuilder.run(`SELECT topic FROM ${table} WHERE topic = $1 OR date = $2`, [meetup.topic, meetup.date]);
    if (rows[0]) {
      return Promise.reject({ status: 422, error: 'Similar meetup exists already' });
    }

    const statement = `INSERT INTO ${table}(topic,location,date,images,tags) VALUES($1, $2, $3, $4, $5) returning *`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, Object.values(meetup))
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static update(meetup, request) {
    const {
      topic,
      location,
      date,
    } = request;

    const statement = `UPDATE ${table} SET topic=$1, location=$2, date=$3, tags=$4 WHERE id=$5 returning *`;
    let tags;

    if (request.tags instanceof Array) {
      request.tags.forEach((tag) => {
        meetup[0].tags.find(existingTag => existingTag === tag.trim()) ? '' : meetup[0].tags.push(tag.trim());
      });
    } else if (request.tags === undefined) {
      meetup[0].tags;
    } else {
      meetup[0].tags.find(existingTag => existingTag === request.tags.trim()) ? '' : meetup[0].tags.push(request.tags.trim());
    }
    tags = meetup[0].tags;

    const data = [
      topic || meetup[0].topic,
      location || meetup[0].location,
      date || meetup[0].date,
      tags = request.tags ? tags : meetup[0].tags,
      meetup[0].id,
    ];

    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [...data])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static delete(meetup) {
    const statement = `DELETE FROM ${table} WHERE id=$1`;
    return new Promise((resolve, reject) => {
      QueryBuilder.run(statement, [meetup.rows[0].id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Meetup;
