import rsvp from '../models/rsvp';
import rsvps from '../data/rsvp.json';
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class RsvpController {
  static create(request, response) {
    const rsvpMeetup = meetup.find(request.params.id);
    if (rsvpMeetup) {
      const payload = {
        id: helper.getNewId(rsvps),
        topic: rsvpMeetup.title,
        meetup: rsvpMeetup.id,
        user: parseInt(request.body.user),
        status: request.body.status,
      };
      const newRsvp = rsvp.create(payload);
      if (newRsvp !== '') {
        return response.status(201).json({
          status: 201,
          data: payload,
        });
      }
      return response.status(500).json({
        status: 500,
        data: 'Error occured! Rsvp creation failed',
      });
    }
    return response.status(404).json({
      status: 404,
      data: 'Invalid ID, Meetup not found',
    });
  }
}

export default RsvpController;