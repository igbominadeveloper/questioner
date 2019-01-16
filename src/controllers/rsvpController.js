import rsvp from '../models/rsvp';
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class RsvpController {
  static index(request, response){
    rsvp.all(request.params.id)
    .then(result => {
      result.rows.map(row => {
        delete row.created_at;
        delete row.updated_at;
        delete row.id;
        delete row.meetup_id;
      })
      return response.status(200).json({
        status: 200,
        data: result.rows
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
    .then(result => {
      result.rows.map(row => {
        delete row.created_at;
        delete row.updated_at;
        delete row.meetup_id;
      })
      return response.status(201).json({
        status: 201,
        data: result.rows[0]
      })      
    })
    .catch(error => console.log(error))
  }
}

export default RsvpController;