import rsvp from '../models/rsvp';
import rsvps from '../data/rsvp.json';
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class RsvpController {
  static create(request, response) {
    if (meetup.all().length > 0){
      if (request.body.user && request.body.status){
        const rsvpMeetup = meetup.find(request.params.id);
        if(rsvpMeetup instanceof Object){
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
        return response.status(404).json({
          status: 404,
          error: `Meetup doesn't exist`
        })
      }
      return response.status(400).json({
        status: 400,
        error: `Request must contain valid user and a status - Yes, No or Maybe`
      })
    }
    return response.status(404).json({
      status: 404,
      error: `No Meetups created yet`
    })
  }
}

export default RsvpController;
