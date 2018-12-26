const meetups = require('../data/meetups.json');
class Meetups {
  static all() {
    return meetups;
  }

  static find(id) {
    return meetups.find(meetup => meetup.id === id);
  }

  static create(request) {
    if (request) {
      return meetups.lastObject;
      const meetup = {
        id: meetups,
        topic: request.topic,
        location: request.location,
        images: request.images ? request.images : [],
        createdOn: new Date().toLocaleString(),
        happeningOn: '21-02-2019',
        tags: request.tags ? request.tags : [],
      };
     // meetups.push(meetup);
     return meetup; 
    }
    return 'No Request was Received';
  }

  static latest() {
    return meetups.sort();
  }
}

module.exports = Meetups;
