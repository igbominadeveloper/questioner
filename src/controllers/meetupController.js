import meetup from '../models/Meetup.js';
import helper from '../helpers/helper.js';
import meetups from '../data/meetups.json';

class meetupController {
  static index(request, response) {
    const allMeetups = meetup.all();
    if (allMeetups.length > 0) {
      allMeetups.forEach((element) => {
        delete element.images;
        delete element.createdOn;
      });
      const data = allMeetups;
      return response.json({
        status: 200,
        data,
      });
    }
    return response.json({
      status: 404,
      message: 'No Meetups available',
    });
  }

  static show(request, response) {
    const returnedMeetup = meetup.find(request.params.id);
    if (returnedMeetup !== false) {
      const data = Object.assign({}, returnedMeetup);
      delete data.images;
      delete data.createdOn;
      return response.json({
        status: 200,
        data,
      });
    }
    return response.json({
      status: 404,
      message: 'Model doesn\'t exist',
    });
  }

  static create(request, response) {
    const payload = request.body;
    const newMeetup = meetup.create(payload);
    if (newMeetup) {
      const data = Object.assign({}, newMeetup);
      delete data.id;
      delete data.images;
      delete data.createdOn;
      return response.json({
        status: 201,
        data,
      });
    }
    return response.json({
      status: 500,
      message: 'Meetup creation failed',
    });
  }

  static update(request, response) {
    return request;
  }
}

export default meetupController;
