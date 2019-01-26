/* eslint-disable camelcase */
import queryFactory from '../../database/queryFactory';



const table = 'votes';

class Vote {
  static find(newVote) {
    const { user_id, question_id } = newVote;
    const statement = `SELECT * FROM ${table} WHERE question_id= $1 AND user_id=$2`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [question_id, user_id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static record(voteType, newVote) {
    const { user_id, question_id } = newVote;
    const weight = voteType === 'upvote' ? '1,0' : '0,1';
    const statement = `INSERT INTO ${table} (user_id, question_id, upvote, downvote) VALUES($1, $2, $3, $4) returning *`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [user_id, question_id, ...weight.split(',')])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  static remove(newVote) {
    const { user_id, question_id } = newVote;
    const statement = `DELETE FROM ${table} WHERE user_id=$1 AND question_id=$2 returning *`;
    return new Promise((resolve, reject) => {
      queryFactory.run(statement, [user_id, question_id])
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

export default Vote;
