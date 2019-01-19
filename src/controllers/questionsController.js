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

  static async show(request, response) {
    try {
      const { rows } = await question.find(request.params.id);
      if (rows.length > 0) {
        const data = Object.assign({}, rows[0]);
        delete data.updated_at;
        delete data.created_at;
        delete data.id;
        delete data.downvotes;
        delete data.upvotes;
        return response.status(200).json({
          data,
        });
      }
      return helper.checkErrorCode(response, { status: 404 });
    } catch (error) {
      return helper.checkErrorCode(response, error);
    }
  }

  static create(request, response) {
    const { meetup_id, user_id } = request.body;
    question.create(request.body)
      .then((result) => {
        if (result.rowCount > 0) {
          const data = Object.assign({}, result.rows[0]);
          delete data.updated_at;
          delete data.created_at;
          delete data.id;
          delete data.downvotes;
          delete data.upvotes;
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
    if (request.user.isadmin) {
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
          question.delete(onDeathRow.rows[0].id)
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
    return helper.checkErrorCode(response, {
      status: 401,
      message: 'You are not authorized to perform this action',
    });
  }


  static async createComment(request, response) {
    try {
      const result = await question.find(request.body.question_id);
      if (result.rowCount > 0) {
        const { rows } = await question.createComment(request.body);
        if (rows[0]) {
          const newComment = Object.assign({}, rows[0]);
          delete newComment.id;
          delete newComment.created_at;
          delete newComment.updated_at;
          return response.status(201).json({
            status: 201,
            data: newComment,
          });
        }
        return helper.checkErrorCode(response, {
          error: 400,
          message: 'Error occured! Comment couldn\'t be created',
        });
      }
      return helper.checkErrorCode(response, {
        error: 404,
        message: 'Cannot comment on a non-existing question',
      });
    } catch (errors) {
      return helper.checkErrorCode(response, errors);
    }
  }

  static async vote(request, response) {
    try {
      const { rows } = await question.find(request.params.id);
      if (rows.length > 0) {
        const result = await QueryBuilder.run('SELECT * FROM votes WHERE user_id=$1 AND question_id=$2', [request.user.id, rows[0].id]);
        if (result.rowCount == 0) {
          await QueryBuilder.run('UPDATE questions SET upvotes = $1 WHERE id=$2', [parseInt(rows[0].upvotes + 1), rows[0].id]);
          await QueryBuilder.run('INSERT INTO votes(user_id,question_id,upvote,downvote) VALUES($1,$2,$3,$4)', [request.user.id, rows[0].id, 1, 0]);
          const upvoted = await question.find(request.params.id);
          const upvoteResult = Object.assign({}, upvoted.rows[0]);
          delete upvoteResult.created_at;
          delete upvoteResult.updated_at;
          delete upvoteResult.id;
          delete upvoteResult.user_id;
          return response.status(201).json({
            data: upvotedResult,
          });
        }
        if (result.rows[0].downvote == 0) {
          await QueryBuilder.run('UPDATE questions SET downvotes = $1 WHERE id=$2', [parseInt(rows[0].downvotes + 1), rows[0].id]);
          await QueryBuilder.run('UPDATE votes SET downvote = $1 WHERE user_id=$2 AND question_id=$3', [1, request.user.id, rows[0].id]);
          const downvoted = await question.find(request.params.id);
          const downvotedResult = Object.assign({}, downvoted.rows[0]);
          delete downvotedResult.created_at;
          delete downvotedResult.updated_at;
          delete downvotedResult.id;
          delete downvotedResult.user_id;
          return response.status(201).json({
            status: 201,
            data: downvotedResult,
          });
        }
        const questionRow = await question.find(request.params.id);
        const questionResult = Object.assign({}, questionRow.rows[0]);
        delete questionResult.created_at;
        delete questionResult.updated_at;
        delete questionResult.id;
        delete questionResult.user_id;
        return response.status(200).json({
          status: 200,
          data: questionResult,
        });
      }
      return helper.checkErrorCode(response, { status: 404, message: 'Cannot vote on a non-existing question' });
    } catch (error) {
      return helper.checkErrorCode(response, error);
    }
  }
}
export default QuestionsController;
