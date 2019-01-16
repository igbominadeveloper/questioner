import rsvp from '../models/rsvp';
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

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
    const payload = {
      user_id: request.body.user_id,
      meetup_id: request.params.id,
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
    .catch(error => helper.checkErrorCode(response,error))
  }
}

export default RsvpController;