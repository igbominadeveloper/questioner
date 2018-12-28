const rsvp = require('../models/rsvp.js');

class RsvpController {
  static index(request, response) {
    return response.status(200).json({
      status: response.status,
      data: rsvp.all(),
      message: 'rsvps found',
    });
  }

  static show(request, response) {
    const error = {};
    const rsvpResponse = rsvp.find(request.params.id);

    if (!rsvpResponse) {
      error.message = 'rsvp does not exist';
      return response.status(404).json({ error });
    }
    return response.status(200).json({
      status: response.status,
      data: rsvpResponse,
      message: 'rsvp found',
    });
  }

  // Add rsvp
  static create(request, response) {
    let id = rsvp.length + 1;

    const newRsvp = {
      id : rsvp.length + 1,
      meetup,
      user,
      response
      } = request.body;

    let latestRsvp = rsvp.create(newRsvp);

    if(latestRsvp){
      return response.status(201).json({
        status: response.status,
        data: latestRsvp,
        message: 'Successfully added rsvp',    
    });
  }
  return response.json({
    status: response.status,
    data
  });
}

  // Update rsvp
  static update(request, response) {
    const error = {};
    return new Promise((resolve, reject) => {
      let data = rsvp.find(request.params.id);
      if(data){
        resolve(data);
      }
      reject("Resource not found");
    });
}

  // Delete rsvp
  static destroy(request, response) {
    const error = {};
    const filteredrsvps = rsvp.delete(request.params.rsvpId);
    
    if (filteredrsvps) {
      return response.status(201).json({
        status: response.status,
        message: 'rsvp successfully deleted',
      });
    }

    return response.status(404).json({
      status: response.status,
      message: 'rsvp does not exist'
    });
  }
}

export default rsvpController;