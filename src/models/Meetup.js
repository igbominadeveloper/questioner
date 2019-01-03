import path from 'path';
import helper from '../helpers/helper';
import meetups from '../data/meetups.json';
import testData from '../../tests/testData';

const filename = path.resolve(__dirname, '../data/meetups.json');

class Meetup {
  static all() {
    return meetups;
  }

  static latest() {
    return meetups.sort((meetup1, meetup2) => meetup1.happeningOn > meetup2.happeningOn);
  }

  static find(id) {
    return helper.exists(meetups, id);
  }

  static create(payload) {
    if (payload) {
      const id = helper.getNewId(meetups);
      const meetup = {
        id,
        title: payload.title,
        location: payload.location,
        images: payload.images ? payload.images : [],
        createdOn: new Date().toLocaleString(),
        happeningOn: payload.happeningOn,
        tags: payload.tags ? payload.tags : [],
      };
      meetups.push(meetup);
      helper.writeToFile(filename, meetups);
      return meetup;
    }
    return false;
  }

  static deleteAll() {
    helper.writeToFile(filename, []);
    return true;
  }

  static recreateAll() {
    helper.writeToFile(filename, testData.meetups);
    return true;
  }


  // static delete(id) {
  //   const meetup = helper.exists(meetups, id);
  //   if (meetup) {
  //     const filtered = meetups.filter(eachMeetup => eachMeetup.id !== meetup.id);
  //     helper.writeToFile(filename, filtered);
  //     return true;
  //   }
  //   return false;
  // }
}

export default Meetup;
