const questions = require('../data/questions.json');

class Questions {
  static all() {
    return questions;
  }

  static latest() {
    return questions.sort();
  }

  static find(id) {
    return questions.find(question => question.id === id);
  }

  static create(request) {
    if (request) {
      const id = questions.length + 1;
      const question = {
        id,
        createdOn: new Date().toLocaleString(),
        createdBy: request.user,
        meetup: request.meetup.id,
        title: request.title,
        body: request.question,
        votes: 0,
      };
      questions.push(question);
      return question;
    }
    return 'No Request was Received';
  }

  static update(id, request) {
    const question = questions.find(id);
  }

  static delete(id) {
    return questions.filter(question => question.id !== id);
  }
}

module.exports = questions;
