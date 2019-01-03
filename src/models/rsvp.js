import path from 'path';
import rsvps from '../data/rsvp.json';
import helper from '../helpers/helper';

const filename = path.resolve(__dirname, '../../src/data/rsvp.json');

class Rsvp {
  static all() {
    return rsvps;
  }

  static find(id) {
    return helper.exists(rsvps, id);
  }

  static create(rsvp) {
    rsvps.push(rsvp);
    helper.writeToFile(filename, rsvps);
    return rsvps[rsvps.length - 1];
  }
}

export default Rsvp;
