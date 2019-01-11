import meetup from '../models/Meetup';

class meetupController {
  static index(request, response) {
    const allMeetups = meetup.all();
    if (allMeetups.length > 0) {
      return response.status(200).json({
        status: 200,
        data: allMeetups,
      });
    }
    return response.status(404).json({
      status: 404,
      error: 'No Meetups available right now',
    });
  }

  static show(request, response) {
    const returnedMeetup = meetup.find(request.params.id);
    if (returnedMeetup !== false) {
      return response.status(200).json({
        status: 200,
        data: returnedMeetup
      });
    }
    return response.status(404).json({
      status: 404,
      error: `Meetup doesn't exist`,
    });
  }

  static create(request, response) {
    const payload = request.body;
    const newMeetup = meetup.create(payload);
      if (newMeetup) {
        const data = Object.assign({}, newMeetup);
        return response.status(201).json({
          status: 201,
          data,
        });
      }
      return response.status(500).json({
        status: 500,
        error: 'Meetup creation failed',
      });
  }

  static destroyAll(request, response) {
    if (meetup.deleteAll()) {
      return response.status(204).json({
        status: 204,
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
      error: 'Meetups Recreation Failed',
    });
  }

  static upcoming(request, response) {
    const result = meetup.upcoming();
    if (result.length > 0) {
      return response.status(200).json({
        status: 200,
        data: result,
      });
    }
    return response.status(404).json({
      status: 404,
      error: 'No Meetups available right now',
    });
  }

  static update(request, response) {
      const fetchedMeetup = meetup.find(request.params.id);
      const requestBody = request.body;
      if (fetchedMeetup instanceof Object) {
        const updatedMeetup = meetup.update(fetchedMeetup, requestBody);
        return response.status(200).json({
          status: 200,
          data: updatedMeetup,
        });
      }
      return response.status(404).json({
        status: 404,
        error: `Meetup doesn't exist`,
      });
    }

  static destroy(request, response) {
    const onDeathRow = meetup.find(request.params.id);
    if (onDeathRow instanceof Object) {
      meetup.delete(onDeathRow.id);
      return response.status(204).json({
        status: 204,
        data: onDeathRow,
      });
    }
    return response.status(404).json({
      status: 404,
      error: `Meetup doesn't exist`,
    });
  }
}

export default meetupController;
