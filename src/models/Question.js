import path from 'path';
import moment from 'moment';
import questions from '../data/questions.json';
import helper from '../helpers/helper';

const filename = path.resolve(__dirname, '../data/questions.json');

class Question {
  static all() {
    return questions;
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
        createdBy: request.createdBy ? request.createdBy : Math.ceil(Math.random()),
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

  static upvote(id) {
    const currentQuestion = helper.exists(questions, id);
    if (currentQuestion.votes >= 0 && currentQuestion) {
      currentQuestion.votes += 1;
      const index = helper.getIndex(questions, currentQuestion.id);
      questions[index] = currentQuestion;
      helper.writeToFile(filename, questions);
      return currentQuestion;
    }
    return currentQuestion;
  }

  static downvote(id) {
    const currentQuestion = helper.exists(questions, id);
    if (currentQuestion.votes > 0 && currentQuestion) {
      currentQuestion.votes -= 1;
      const index = helper.getIndex(questions, currentQuestion.id);
      questions[index] = currentQuestion;
      helper.writeToFile(filename, questions);
      return currentQuestion;
    }
    return currentQuestion;
  }
}

export default Question;
