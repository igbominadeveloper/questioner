import question from '../models/Question';
import helper from '../helpers/helper';
import QueryBuilder from '../database/queryBuilder';

class QuestionsController {
  static index(request, response) {
    question.all()
      .then((result) => {
        if (result.rowCount > 0) {
          result.rows.map((row) => {
            delete row.created_at;
            delete row.updated_at;
            delete row.id;
          });
          return response.status(200).json({
            status: 200,
            data: result.rows,
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'No Questions available right now',
        });
      })
      .catch(error => response.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static show(request, response) {
    question.find(request.params.id)
      .then((result) => {
        if (result.rowCount > 0) {
          result.rows.map((row) => {
            delete row.created_at;
            delete row.updated_at;
          });
          return response.status(200).json({
            status: 200,
            data: result.rows[0],
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'Question doesn\'t exist',
        });
      })
      .catch(error => response.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static create(request, response) {
    const { meetup_id, user_id } = request.body;
    question.create(request.body)
      .then((result) => {
        if (result.rowCount > 0) {
          const data = Object.assign({}, result.rows[0]);
          delete data.updated_at;
          delete data.created_at;
          delete data.user_id;
          delete data.meetup_id;
          return response.status(201).json({
            status: 201,
            data,
          });
        }
        return response.status(500).json({
          status: 500,
          error: 'Question creation failed',
        });
      })
      .catch(error => response.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static update(request, response) {
    const requestBody = request.body;
    question.find(request.params.id)
      .then((result) => {
        if (result.rowCount > 0) {
          return result;
        }
        return response.status(404).json({
          status: 404,
          error: 'Meetup doesn\'t exist',
        });
      })
      .then(result => question.update(result, requestBody))
      .then((updated) => {
        updated.rows.map((row) => {
          delete row.created_at;
        });
        return response.status(202).json({
          status: 202,
          data: updated.rows[0],
        });
      })
      .catch(error => response.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static destroy(request, response) {
    question.find(request.params.id)
      .then((result) => {
        if (result.rowCount > 0) {
          return result;
        }
        return response.status(404).json({
          status: 404,
          error: 'Meetup doesn\'t exist',
        });
      })
      .then((onDeathRow) => {
        question.delete(onDeathRow)
          .then(deleted => response.status(200).json({
            status: 200,
            message: 'Question deleted successfully',
          }));
      })
      .catch(error => response.status(400).json({
        status: 400,
        error: error.message,
      }));
  }

  static async createComment(request, response) {
    try {
        const result = await question.find(request.body.question_id);
        if(result.rowCount > 0){ 
          const { rows }  = await question.createComment(request.body);
          if (rows[0]){
            return response.status(201).json({
              status: 201,
              data: rows
            })
          }
          return helper.checkErrorCode(response, { 
            error: 400, 
            message: `Error occured! Comment couldn't be created` 
          })
        }
        return helper.checkErrorCode(response, {
         error: 404, 
         message: `Cannot comment on a non-existing question` 
       })
      }
      catch (errors){
         return helper.checkErrorCode(response, {
          error: 404, 
          message: errors 
        })
      }
    }
}

export default QuestionsController;
