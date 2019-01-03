import rsvps from '../data/rsvp.json';
import helper from '../helpers/helper';
import path from 'path';
const filename = path.resolve(__dirname, '../../src/data/rsvp.json');

class Rsvp {
  static all() {
    return rsvps;
  }

  static latest() {
    return rsvps.sort();
  }

  static find(id) {
    return helper.exists(rsvps, id);
  }

  static create(rsvp) {
    rsvps.push(rsvp);
    helper.writeToFile(filename, rsvps);
    return rsvps[rsvps.length -1];
  }

  static update(id, request) {
    const rsvp = rsvp.find(id);
  }

  static delete(id) {
    return rsvps.filter(rsvp => rsvp.id !== id);
  }
}

export default Rsvp