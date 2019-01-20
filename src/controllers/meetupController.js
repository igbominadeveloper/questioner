/* eslint-disable no-param-reassign */
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class meetupController {
  static async index(request, response) {
    try {
      const { rows } = await meetup.all();
      if (rows.length > 0) {
        rows.map((row) => {
          delete row.created_at;
          delete row.updated_at;
          delete row.id;
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
        error: error.message,
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
        error: error.message,
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
      return helper.checkErrorCode(response, {
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
      return helper.checkErrorCode(response, {
        status: 404,
        message: 'No Upcoming meetups',
      });
    } catch (error) {
      return helper.checkErrorCode(response, {
        status: 400,
        message: 'Error occured',
      });
    }
  }

  static update(request, response) {
    if (request.user.isadmin) {
      const requestBody = request.body;
      meetup.find(request.params.id)
        .then(result => meetup.update(result, requestBody))
        .then((updated) => {
          updated.rows.map((row) => {
            delete row.created_at;
            delete row.images;
            delete row.tags;
          });
          return response.status(202).json({
            status: 202,
            data: updated.rows[0],
          });
        })
        .catch(error => response.status(404).json({
          status: 404,
          error: 'Meetup not found' || error,
        }));
    } else {
      return helper.checkErrorCode(response, { status: 401, message: 'You are not authorized to perform this action' });
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
              error: error.message,
            }));
        })
        .catch(error => response.status(404).json({
          status: 400,
          error: error.message,
        }));
    } else {
      return helper.checkErrorCode(response, { status: 401, message: 'You are not authorized to perform this action' });
    }
  }
}

export default meetupController;
