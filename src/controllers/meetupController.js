const meetup = require('../models/Meetup.js');

class MeetupController {
  // Get all meetups
  static index(request, response) {
    return new Promise((resolve, reject) => {
      meetup.all()
      .then(response => {
        return response.json({
          status: response.status,
          data: response.body,
          message: 'meetups found',
        });        
      })
      .catch(error => {
        return response.json({
          status: response.status,
          error: 'No meetup found',
        });   
      });
    });
  }

  // Get a meetup
  static show(request, response) {
    return new Promise((resolve, reject) => {
      meetup.find(request.params.id)
      .then(response => {
        return response.json({
          status: response.status,
          data: response.body,
          message: 'meetup found',
        });        
      })
      .catch(error => {
        return response.json({
          status: response.status,
          error: 'Resource Not found',
        });   
      });
    });
  }

  // Add meetup
  static create(request, response) {
    const payload = {
      id: meetup.length + 1,
      topic: request.topic,
      location: request.location,
      images: request.images ? request.images : [],
      createdOn: request.createdOn,
      happeningOn: request.happeningOn,
      tags: request.tags ? request.images : []
    };

    return new Promise((resolve, reject) => {
      meetup.create(payload)
      .then(response => {
        return response.json({
          status: response.status,
          data: response.body,
          message: 'Successfully added meetup',
        });
      })
      .catch(error => {
        return response.json({
          status: response.status,
          error: error.response,
        });   
      });
    });
  }
  // Update meetup
  static update(request, response) {
    return new Promise((resolve, reject) => {
      let data = meetup.find(request.params.id);
      if(!data){ 
        reject({
          status: 404,
          error: "Meetup record not found"
        });
      }
      meetup.update(request.params.id,request.body)
      .then(response => {
        return response.json({
          status: response.status,
          data: response.body,
          message: 'Successfully added meetup',
        });
      })
      .catch(error => {
        return response.json({
          status: error.status,
          error: error.error,
        });   
      });
    });
  }

  // Delete meetup
  static destroy(request, response) {
    return new Promise((resolve, reject) => {
      meetup.delete(request.params.id)
      .then(response => {
        return response.json({
          status: response.status,
          message: 'Successfully added meetup',
        });
      })
      .catch(error => {
        return response.json({
          status: response.status,
          message: 'Error! Delete operation failed',
        });
      });
    });
  }
}
export default meetupController;