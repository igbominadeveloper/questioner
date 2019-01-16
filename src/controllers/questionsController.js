import question from '../models/Question';

class QuestionsController {
    static index(request, response) {
      question.all()
      .then(result => {
        if(result.rowCount > 0) {
          result.rows.map(row => {
            delete row.created_at;
            delete row.updated_at;
            delete row.id;
          })
        return response.status(200).json({
          status: 200,
          data: result.rows
        })
        }
        return response.status(404).json({
          status: 404,
          error: 'No Questions available right now',
        });    
      })
    .catch(error => {
      return response.status(400).json({
        status: 400,
        error: error.message
      })
      })
    }

    static show(request, response) {
      question.find(request.params.id)
      .then(result => {
        if(result.rowCount > 0) {
          result.rows.map(row => {
            delete row.created_at;
            delete row.updated_at;
          })
          return response.status(200).json({
            status: 200,
            data: result.rows[0]
          })
        }
        return response.status(404).json({
          status: 404,
          error: `Question doesn't exist`,
        });
      })
      .catch(error => {
        return response.status(400).json({
          status: 400,
          error: error.message
        })
      })
    }

    static create(request, response) {
      question.create(request.body)
      .then(result => {
        if(result.rowCount > 0){
          const data = Object.assign({}, result.rows[0]);
          delete data.updated_at;
          return response.status(201).json({
            status: 201,
            data,
          });
        }
        return response.status(500).json({
          status: 500,
          error: 'Question creation failed',
        })
      })
      .catch(error => {
        return response.status(400).json({
          status: 400,
          error: error.message,
        })
      })
    }

    static update(request, response) {
      const requestBody = request.body;
      question.find(request.params.id)
      .then(result => {
        if(result.rowCount > 0) {
          return result
        }
        return response.status(404).json({
          status: 404,
          error: `Meetup doesn't exist`,
        })
      })
      .then(result => question.update(result, requestBody))
      .then(updated => {
        updated.rows.map(row => {
          delete row.created_at;
        });
        return response.status(202).json({
          status: 202,
          data: updated.rows[0]
        });
      })
      .catch(error => {
        return response.status(400).json({
          status: 400,
          error: error.message,
        })
      })
    }

    static destroy(request, response) {
      question.find(request.params.id)
      .then(result => {
        if(result.rowCount > 0) {
          return result
        }
        return response.status(404).json({
          status: 404,
          error: `Meetup doesn't exist`,
        })     
      })
      .then(onDeathRow => {
        question.delete(onDeathRow)
        .then(deleted => {
          return response.status(200).json({
            status: 200,
            message: `Question deleted successfully` 
          })
        })        
      })
      .catch(error => {
       return response.status(400).json({
         status: 400,
         error: error.message,
       })
      })
    }
  static vote(request, response) {
    const returnedQuestion = question.find(request.params.id);
    if (returnedQuestion) {
      const result = request.url.endsWith('upvote')
        ? question.upvote(returnedQuestion.id)
        : question.downvote(returnedQuestion.id);
      return response.status(201).json({
        status: 201,
        data: result,
      });
    }
    return response.status(400).json({
      status: response.status,
      error: 'Question not found',
    });
  }
}
export default QuestionsController;