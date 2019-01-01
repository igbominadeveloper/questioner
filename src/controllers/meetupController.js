import meetup from '../models/Meetup.js';
import helper from '../helpers/helper.js';
import meetups from '../data/meetups.json';

class meetupController {
   static index(request, response) {
    let allMeetups = meetup.all();
    if(allMeetups.length > 0) {
    allMeetups.forEach(element => {
      delete element.images;
      delete element.createdOn;
    });
    let data = allMeetups;
    return response.json({
      status: 200,
      data: data
    });
    }
    return response.json({
      status: 404,
      message: `No Meetups available`
    })
  }

  static show(request, response) {
    let returnedMeetup = meetup.find(request.params.id);
    if(returnedMeetup !== false) {
    let data = Object.assign({}, returnedMeetup);
    delete data.images;
    delete data.createdOn;
      return response.json({
        status: 200,
        data: data
      });
    }
    return response.json({
      status: 404,
      message: `Model doesn't exist`
    })
  }

  static create(request, response){
    let payload = request.body;
    let newMeetup = meetup.create(payload);
    if(newMeetup){
      let data = Object.assign({}, newMeetup);
      delete data.id;
      delete data.images;
      delete data.createdOn;
      return response.json({
        status: 201,
        data: data
      });
    }
    return response.json({
      status: 500,
      message: "Meetup creation failed"
    });
  }

  static update(request, response){
    return request;
  }
}

export default meetupController;