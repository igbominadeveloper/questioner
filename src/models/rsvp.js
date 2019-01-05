import path from 'path';
import rsvps from '../data/rsvp.json';
import helper from '../helpers/helper';

const filename = path.resolve(__dirname, '../../src/data/rsvp.json');

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
