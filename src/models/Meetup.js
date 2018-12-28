const meetups = require('../data/meetups.json');

class Meetups {
  static all() {
    return new Promise((resolve, reject) => {
      if(meetups){
        resolve(meetups);
      }
      reject({"error":"No Meetup found"});
    });
  }

  static latest() {
    return meetups.sort();
  }

  static find(id) {
    return meetups.find(meetup => meetup.id === id);
  }

  static create(request) {
    return new Promise((resolve, reject) => {
      if (request) {
        const id = meetups.length + 1;
        const meetup = {
          id,
          topic: request.topic,
          location: request.location,
          images: request.images ? request.images : [],
          createdOn: new Date().toLocaleString(),
          happeningOn: request.happeningOn,
          tags: request.tags ? request.tags : [],
        };
        meetups.push(meetup);
        resolve(meetup);
      }
    });
  }

  static update(id, request) {
    const meetup = meetups.find(id);
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      if (id) {
        const filtered = meetups.filter(meetup => meetup.id !== id);
        resolve(filtered);
      }
      reject('Error occured');
    });
  }
}
module.exports = meetup;
