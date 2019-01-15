import rsvp from '../models/rsvp';
import meetup from '../models/Meetup';

class RsvpController {
  static index(request, response){
    rsvp.all(request.params.id)
    .then(response => {
      return response.status(200).json({
        status: 200,
        data: response.body
      })      
    })
    .catch(error => {
      return response.status(404).json({
        status: 404,
        error: error.message
      })    
    })
  }

  static create(request, response) {
    const userId = request.user.id;
    const payload = {
      userId,
      meetupId: request.params.id,
      topic: request.body.topic,
      status: request.body.status
    }
    rsvp.create(payload)
    .then(response => {
      return response.status(201).json({
        status: 201,
        data: response.body
      })      
    })
    .catch(error => {
      switch (error.status) {
        case 404: return response.status(404).json({
          status: 404,
          error: error.message
        });
        break; 
        case 400: return response.status(400).json({
          status: 400,
          error: error.message
        });
        break; 
        case 403: return response.status(403).json({
          status: 403,
          error: error.message
        });
        break;
        case 401: return response.status(401).json({
          status: 401,
          error: error.message
        });
        break;
        default (400);
        break;
      }
    })
  }
}

export default RsvpController;