import question from '../models/Question';

class QuestionsController {
  static index(request, response) {
    const data = question.all();
    if (data.length > 0) {
      return response.status(200).json({
        status: 200,
        data,
      });
    }
    return response.status(404).json({
      status: 404,
      error: 'No Questions available',
    });
  }

  static show(request, response) {
    const returnedQuestion = question.find(request.params.id);
    if (returnedQuestion instanceof Object) {
      delete returnedQuestion.votes;
      delete returnedQuestion.createdOn;
      return response.status(200).json({
        status: 200,
        data: returnedQuestion,
      });
    }
    return response.status(404).json({
      status: 404,
      error: 'Model Not Found',
    });
  }

  static create(request, response) {
    if (request.body.title && request.body.body && request.body.meetup) {
      const newQuestion = question.create(request.body);
      if (newQuestion instanceof Object) {
        delete newQuestion.createdOn;
        delete newQuestion.votes;
        return response.status(201).json({
          status: 201,
          data: newQuestion,
        });
      }
    }
    return response.status(400).json({
      status: 400,
      error: 'Request missing complete payload. Confirm it includes - meetup, title and the body of a question',
    });
  }

  static vote(request, response) {
    const returnedQuestion = question.find(request.params.id);
    if (returnedQuestion) {
      const result = request.url.endsWith('upvote')
        ? question.upvote(returnedQuestion.id)
        : question.downvote(returnedQuestion.id);
      delete result.createdOn;
      delete result.createdBy;
      delete result.id;
      return response.status(201).json({
        status: 201,
        data: result,
      });
    }
    return response.status(400).json({
      status: response.status,
      error: 'Question model not found',
    });
  }
}

export default QuestionsController;
