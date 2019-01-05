import rsvp from '../models/rsvp';
import rsvps from '../data/rsvp.json';
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class RsvpController {
  static create(request, response) {
    if (request.body.user && request.body.status){
      const rsvpMeetup = meetup.find(request.params.id);
      const newRsvp = {
        id: helper.getNewId(rsvps),
        meetup: parseInt(rsvpMeetup.id),
        topic: rsvpMeetup.title,
        status: request.body.status,
        user: parseInt(request.body.user),
      }
      const createdRsvp = rsvp.create(newRsvp);
      return response.status(201).json({
        status: 201,
        data: createdRsvp,
      });
    }
    return response.status(400).json({
      status: 400,
      error: `Request must contain valid user and a status - Yes, No or Maybe`
    })
  }
}

export default RsvpController;
