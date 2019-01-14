import path from 'path';

class Rsvp {
  static all(id) {
    return rsvps.filter(rsvp => rsvp.meetup == parseInt(id));
  }

  static create(rsvp) {
    rsvps.push(rsvp);
    helper.writeToFile(filename, rsvps);
    return rsvps[rsvps.length - 1];
  }
}

export default Rsvp;
