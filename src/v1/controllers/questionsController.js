/* eslint-disable camelcase */
import question from '../models/Question';
import helper from '../helpers/helper';
import queryFactory from '../../database/queryFactory';


import meetup from '../models/Meetup';
import vote from '../models/vote';

/**
 * -----------------------------------------------------------
 * QuestionsController
 * -----------------------------------------------------------
 * 
 * This controller is responsible for 
 * handling every request that goes 
 * to any of the /questions route 
 */

class QuestionsController {

  /**
   * fetch all questions
   * 
   * @param {Object} request 
   * @param {Object} response
   * @return {Array} questions 
   */

  static index(_request, response) {
    question.all()
      .then((result) => {
        if (result.rowCount > 0) {
          result.rows.map((row) => {
            delete row.created_at;
            delete row.updated_at;
          });
          return response.status(200).json({
            status: 200,
            data: [result.rows],
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'No Questions available right now',
        });
      })
      .catch(error => response.status(400).json({
        status: 400,
        error: error.error,
      }));
  }
  
  /**
   * Show a single question
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @return {Object} question
   */

  static async show(request, response) {
    try {
      const { rows } = await question.find(request.params.id);
      if (rows.length > 0) {
        const data = Object.assign({}, rows[0]);
        delete data.updated_at;
        delete data.created_at;
        return response.status(200).json({
          status: 200,
          data,
        });
      }
      return helper.errorResponse(response, { status: 404 });
    } catch (error) {
      return helper.errorResponse(response, error);
    }
  }

  /**
   * create a new question resource
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @return {Object} new question
   */

  static async create(request, response) {
    const newQuestion = request.body;
    newQuestion.user_id = request.user.id;
    const questionMeetup = await meetup.find(newQuestion.meetup_id);
    if (questionMeetup.rowCount === 0) {
      return helper.errorResponse(response,
        { status: 404, error: 'You cannot ask question on a non-existent meetup' });
    }
    const questionResult = await queryFactory.run('SELECT * FROM questions WHERE meetup_id = $1 AND title = $2 OR body = $3', [newQuestion.meetup_id, newQuestion.title, newQuestion.body]);
    if (questionResult.rowCount > 0) {
      return helper.errorResponse(response,
        { status: 409, error: `Your question has been asked already: see http://${request.hostname}${request.url}/${questionResult.rows[0].id}` });
    }

    try {
      const { rows } = await question.create(newQuestion);
      const data = Object.assign({}, rows[0]);
      delete data.updated_at;
      delete data.user_id;
      delete data.created_at;
      delete data.downvotes;
      delete data.upvotes;
      return response.status(201).json({
        status: 201,
        data,
      });
    } catch (error) {
      return helper.errorResponse(response, error);
    }
  }

  /**
   * update a question resource
   * 
   * @param {Object} request 
   * @param {Object} response
   * @return {Object} updated question 
   */
  static update(request, response) {
    const requestBody = request.body;
    question.find(request.params.id)
      .then(result => result)
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
        error: error.error,
      }));
  }

  /**
   * delete a question resource
   * 
   * @param {Object} request 
   * @param {Object} response
   * @return {JSON} response 
   */

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
            .then(() => response.status(200).json({
              status: 200,
              message: 'Question deleted successfully',
            }));
        })
        .catch(error => response.status(400).json({
          status: 400,
          error: error.error,
        }));
    }
    return helper.errorResponse(response, {
      status: 401,
      error: 'You are not authorized to perform this action',
    });
  }


  /**
   * create a new question comment
   * 
   * @param {Object} request 
   * @param {Object} response
   * @return {Object} new comment resource 
   */

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
        return helper.errorResponse(response, {
          error: 400,
          error: 'Error occured! Comment couldn\'t be created',
        });
      }
      return helper.errorResponse(response, {
        error: 404,
        error: 'Cannot comment on a non-existing question',
      });
    } catch (errors) {
      return helper.errorResponse(response, errors);
    }
  }

  /**
   * upvote or downvote a question
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @return {Object} question
   */
  
  static async vote(request, response) {
    const newVote = {
      user_id: parseInt(request.user.id, 10),
      question_id: parseInt(request.params.id, 10),
    };
    const voteType = request.url.endsWith('upvote') ? 'upvote' : 'downvote';
    const { rows } = await question.find(newVote.question_id);
    if (rows[0]) {
      const singleVote = await vote.find(newVote);
      if (singleVote.rowCount === 0) {
        await vote.record(voteType, newVote);
        const value = rows[0][`${voteType}s`] === 0 ? 0 : parseInt(rows[0][`${voteType}s`], 10);
        const result = await question.update(`${voteType}s`, value + 1);
        const updatedQuestion = Object.assign({}, result.rows[0]);
        delete updatedQuestion.id;
        delete updatedQuestion.user_id;
        delete updatedQuestion.created_at;
        delete updatedQuestion.updated_at;
        return response.status(200).json({
          status: 200,
          data: updatedQuestion,
        });
      }
      const currentVote = await vote.find(newVote);
      const row = currentVote.rows[0].upvote === 1 ? 'upvotes' : 'downvotes';
      const newQuestionValue = await question.find(newVote.question_id);
      await vote.remove(newVote);
      const value = parseInt(newQuestionValue.rows[0][`${row}`], 10);
      const result = await question.update(row, value - 1);
      const updatedQuestion = Object.assign({}, result.rows[0]);
      delete updatedQuestion.id;
      delete updatedQuestion.user_id;
      delete updatedQuestion.created_at;
      delete updatedQuestion.updated_at;
      return response.status(200).json({
        status: 200,
        data: updatedQuestion,
      });
    }
    return helper.errorResponse(response, { status: 404, error: 'Cannot vote on a non-existing question' });
  }
}
export default QuestionsController;
