/* eslint-disable no-param-reassign */
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class meetupController {
  /**
   * Fetches all available meetups
   * @params {object} request
   * @params {object} response
   * @return {Array} meetups
   */
  static async index(request, response) {
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
        .catch(error => response.status(422).json({
          status: 422,
          error: error.error,
        }));
    } else {
      return helper.errorResponse(response, {
        status: 401,
        message: 'You are not authorized to perform this action',
      });
    }
  }


  static async upcoming(request, response) {
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
        message: 'No Upcoming meetups',
      });
    } catch (error) {
      return helper.errorResponse(response, {
        status: 400,
        message: 'Error occured',
      });
    }
  }

  static async update(request, response) {
    if (request.user.isadmin) {
      try {
        const { rows } = await meetup.find(request.params.id);
        if (rows.length > 0) {
          const result = await meetup.update(rows, request.body);
          return response.status(200).json({
            status: 200,
            data: result,
          });
        }
        return helper.errorResponse(response, { status: 404, error: 'Meetup not found' });
      } catch (error) {
        return helper.errorResponse(response, { status: error.status, error: error.message });
      }
    } else {
      return helper.errorResponse(response, { status: 401, error: 'You are not authorized to perform this action' });
    }
  }

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
      return helper.errorResponse(response, { status: 401, message: 'You are not authorized to perform this action' });
    }
  }
}

export default meetupController;
