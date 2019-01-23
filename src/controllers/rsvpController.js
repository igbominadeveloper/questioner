/* eslint-disable quotes */
import rsvp from '../models/rsvp';
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class RsvpController {
  static index(request, response) {
    rsvp.all(request.params.id)
      .then((result) => {
        if (result.rowCount > 0) {
          result.rows.map((row) => {
            delete row.created_at;
            delete row.updated_at;
            delete row.id;
            delete row.meetup_id;
          });
          return response.status(200).json({
            status: 200,
            data: result.rows,
          });
        }
        return helper.errorResponse(response, { status: 404, error: 'No rsvp yet for this meetup' });
      })
      .catch(error => response.status(404).json({
        status: 404,
        error: error.error,
      }));
  }

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

export default RsvpController;
