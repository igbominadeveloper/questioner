/* eslint-disable no-param-reassign */
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class meetupController {
/**
 * ------------------------------------------------------------------
 * meetController
 * ------------------------------------------------------------------
 * 
 * This controller is responsible for handling all CRUD 
 * operations for meetups in the application with a
 * method for fetching upcoming meetups included 
 */

  /**
   * Fetch all available meetups
   * 
   * @param {Object} request
   * @param {Object} response
   * @return {Array} meetups
   */

  static async index(_request, response) {
    try {
      const { rows } = await meetup.all();
      if (rows.length > 0) {
        rows.map((row) => {
          delete row.created_at;
          delete row.updated_at;
          delete row.images;
        });
        return response.status(200).json({
          status: 200,
          data: rows,
        });
      }
      return response.status(404).json({
        status: 404,
        error: 'No Meetups available right now',
      });
    } catch (error) {
      return response.status(400).json({
        status: 400,
        error: error.error,
      });
    }
  }

  /**
   * Show a single meetup resource
   * 
   * @param {Object} request
   * @param {Object} response
   * @return {Array} meetup
   */

  static show(request, response) {
    meetup.find(request.params.id)
      .then((result) => {
        if (result.rowCount > 0) {
          result.rows.map((row) => {
            delete row.created_at;
            delete row.updated_at;
            delete row.images;
          });
          return response.status(200).json({
            status: 200,
            data: [result.rows[0]],
          });
        }
        return response.status(404).json({
          status: 404,
          error: 'Meetup doesn\'t exist',
        });
      })
      .catch(error => response.status(400).json({
        status: 400,
        error: error.error,
      }));
  }

  /**
   * create a new meetup resource after successful validation
   * 
   * @param {object} request
   * @param {object} response
   * @return {Array} new meetup resource
  */ 

  static create(request, response) {
    if (request.user.isadmin) {
      meetup.create(request.body)
        .then((result) => {
          if (result.rowCount > 0) {
            const data = Object.assign({}, result.rows[0]);
            delete data.created_at;
            delete data.updated_at;
            delete data.images;
            return response.status(201).json({
              status: 201,
              data,
            });
          }
          return response.status(500).json({
            status: 500,
            error: 'Meetup creation failed',
          });
        })
        .catch(error => {
          return response.status(422).json({
          status: 422,
          error: error,
        })
      });
    } else {
      return helper.errorResponse(response, {
        status: 401,
        error: 'You are not authorized to perform this action',
      });
    }
  }

  /** 
   * fetch all upcoming meetups 
   * i.e. meetups with date 
   * ahead of Date.now()
   * 
   * @param {Object} request
   * @param {Object} response
   * @return {Array} upcoming meetups
  */

  static async upcoming(_request, response) {
    try {
      const { rows } = await meetup.upcoming();
      if (rows.length > 0) {
        rows.map((row) => {
          delete row.images;
          delete row.created_at;
          delete row.updated_at;
        });
        return response.status(200).json({
          status: 200,
          data: [rows],
        });
      }
      return helper.errorResponse(response, {
        status: 404,
        error: 'No Upcoming meetups',
      });
    } catch (error) {
      return helper.errorResponse(response, {
        status: 400,
        error: 'Error occured',
      });
    }
  }

  /**
   * update a particular meetup resource
   * 
   * @param {Object} request 
   * @param {Object} response
   * @return {Array} updated meetup resource 
   */

  static async update(request, response) {
    if (!request.user.isadmin) {
      return helper.errorResponse(response, { status: 401 });
    }
    try {
      const { rows } = await meetup.find(request.params.id);
      if (rows.length > 0) {
        const result = await meetup.update(rows, request.body);
        return response.status(200).json({
          status: 200,
          data: result.rows[0],
        });
      }
      return helper.errorResponse(response, { status: 404, error: 'Meetup not found' });
    } catch (error) {
      return helper.errorResponse(response, { status: error.status, error: error.error });
    }
  }

  /**
   * delete a meetup resource
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @return {Object} 200 JSON response
   */

  static destroy(request, response) {
    if (request.user.isadmin) {
      meetup.find(request.params.id)
        .then((onDeathRow) => {
          meetup.delete(onDeathRow)
            .then(() => response.status(200).json({
              status: 200,
              message: 'Meetup deleted successfully',
            }))
            .catch(error => response.status(400).json({
              status: 400,
              error: error.error,
            }));
        })
        .catch(error => response.status(404).json({
          status: 400,
          error: error.error,
        }));
    } else {
      return helper.errorResponse(response, { status: 401, error: 'You are not authorized to perform this action' });
    }
  }
}

export default meetupController;
