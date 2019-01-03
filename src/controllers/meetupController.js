import meetup from '../models/Meetup';

class meetupController {
  static index(request, response) {
    const allMeetups = meetup.all();
    if (allMeetups.length > 0) {
      const data = allMeetups;
      data.forEach((element) => {
        delete element.images;
        delete element.createdOn;
      });
      return response.status(200).json({
        status: 200,
        data,
      });
    }
    return response.status(404).json({
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
    return response.status(404).json({
      status: 404,
      message: 'Meetup doesn\'t exist',
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
      return response.status(201).json({
        status: 201,
        data,
      });
    }
    return response.json({
      status: 500,
      message: 'Meetup creation failed',
    });
  }

  static destroyAll(request, response) {
    if (meetup.deleteAll()) {
      return response.status(200).json({
        status: 200,
        message: 'Meetups Deleted',
      });
    }
  }

  static recreateAll(request, response) {
    if (meetup.recreateAll()) {
      return response.status(200).json({
        status: 200,
        message: 'Meetups Recreated',
      });
    }
    return response.status(500).json({
      status: 500,
      message: 'Meetups Recreation Failed',
    });
  }
}

export default meetupController;
