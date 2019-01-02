import rsvps from '../data/rsvp.json';
import helper from '../helpers/helper';

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

  static create(request) {
  }

  static update(id, request) {
    const rsvp = rsvp.find(id);
  }

  static delete(id) {
    return rsvps.filter(rsvp => rsvp.id !== id);
  }
}

export default Rsvp