const rsvp = require('../data/rsvp.json');

class rsvp {
  static all() {
    return rsvp;
  }

  static latest() {
    return rsvp.sort();
  }

  static find(id) {
    return rsvp.find(rsvp => rsvp.id === id);
  }

  static create(request) {
    if (request) {
      const id = rsvp.length + 1;
      const newRsvp = {
        id: 1,
        meetup: 3,
        user: 4,
        response: 'Yes, see you in Egypt',
      };
      rsvp.push(newRsvp);
      return newRsvp;
    }
    return 'No Request was Received';
  }

  static update(id, request) {
    const rsvp = rsvp.find(id);
  }

  static delete(id) {
    return rsvp.filter(rsvp => rsvp.id !== id);
  }
}

module.exports = rsvp;
