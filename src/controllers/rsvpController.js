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
        return helper.errorResponse(response, { status: 404, message: 'No rsvp yet for this meetup' });
      })
      .catch(error => response.status(404).json({
        status: 404,
        error: error.error,
      }));
  }

  static create(request, response) {
    const payload = {
      user_id: request.user.id,
      meetup_id: request.params.id,
      status: request.body.status,
    };
    rsvp.create(payload)
      .then((result) => {
        result.rows.map((row) => {
          delete row.created_at;
          delete row.updated_at;
          delete row.meetup_id;
        });
        return response.status(201).json({
          status: 201,
          data: result.rows[0],
        });
      })
      .catch(error => helper.errorResponse(response, error));
  }
}

export default RsvpController;
