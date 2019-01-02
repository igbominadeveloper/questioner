import questions from '../data/questions.json';
import path from 'path';
const filename = path.resolve(__dirname, '../data/questions.json');
import helper from '../helpers/helper';
import moment from 'moment';

class Question {
  static all() {
    return questions;
  }

  static latest() {
    return questions.sort();
  }

  static find(id) {
    return helper.exists(questions, id);
  }

  static create(request) {
    if (request) {
      const id = helper.getNewId(questions);
      const question = {
        id,
        createdOn: moment(),
        createdBy: request.createdBy ? request.createdBy: Math.ceil(Math.random()),
        meetup: parseInt(request.meetup),
        title: request.title,
        body: request.body,
        votes: 0,
      };
      questions.push(question);
      helper.writeToFile(filename, questions);
      return question;
    }
    return false;
  }

  static update(id, request) {
    const question = questions.find(id);
  }

  static delete(id) {
    return questions.filter(question => question.id !== id);
  }
}

export default Question