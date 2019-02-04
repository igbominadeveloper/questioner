/* eslint-disable quotes */
import rsvp from '../models/rsvp';
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class RsvpController {
/**
 * -----------------------------------------------------------
 * RsvpController
 * -----------------------------------------------------------
 * 
 * This controller is responsible for 
 * handling every request that goes 
 * to any of the /rsvps routes 
 */

  /**
   * 
   * Fetch all rsvps for a single meetup
   * 
   * @param {Object} request
   * @param {Object} response
   * @return {Object} rsvps
   */

  static async index(request, response) {
    if (request.user.isadmin === 1) {
      try {
        const { rows } = await rsvp.all(request.params.id);
        if (rows.length > 0) {
          rows.map((row) => {
            delete row.created_at;
            delete row.id;
            delete row.updated_at;
            delete row.meetup_id;
          });
          return response.status(200).json({
            status: 200,
            data: rows,
          });
        }
        return helper.errorResponse(response, { status: 404, error: 'No RSVPS yet for this meetup' });
      } catch (error) {
        return helper.errorResponse(response, { status: 404 });
      }
    }
    return helper.errorResponse(response, { status: 401, error: 'This action is restricted to admin only' });
  }

  /**
   * 
   * record a users's rsvp for a meetup
   * 
   * @param {Object} request
   * @param {Object} response
   * @return {Object} rsvps
   */

  static async create(request, response) {
    const payload = {
      user_id: request.user.id,
      meetup_id: request.params.id,
      status: request.body.status,
    };
    try {
      const { rows } = await meetup.find(payload.meetup_id);
      if (rows.length > 0) {
        const result = await rsvp.create(payload);
        result.rows.map((row) => {
          delete row.created_at;
          delete row.updated_at;
          delete row.meetup_id;
        });
        return response.status(201).json({
          status: 201,
          data: result.rows[0],
        });
      }
      return helper.errorResponse(response,
        {
          status: 404,
          error: `Meetup specified doesn't exist`,
        });
    } catch (error) {
      return helper.errorResponse(response, { status: error.status, error: error.message });
    }
  }
}

/**
 * export a default object
 * 
 * @exports RsvpController
 */

export default RsvpController;
