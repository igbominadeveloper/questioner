import path from 'path';
import moment from 'moment';
import helper from '../helpers/helper';
import meetups from '../data/meetups.json';
import testData from '../../tests/testData';

const filename = path.resolve(__dirname, '../data/meetups.json');

class Meetup {
  static all() {
    return meetups;
  }

  static upcoming() {
    return meetups.sort((meetup1, meetup2) => {
      return new Date(meetup2.happeningOn).getTime() - new Date(meetup1.happeningOn).getTime();
    });
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
        createdOn: moment(new Date()),
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

  static update(meetup, request) {
    const {
      title,
      location,
      happeningOn,
    } = request;

    meetup.title = title;
    meetup.location = location;
    meetup.happeningOn = happeningOn;

    if (request.tags instanceof Array) {
      request.tags.forEach((tag) => {
        meetup.tags.find(item => item == tag) ? '' : meetup.tags.push(tag);
      });
    } else if (request.tags == undefined) {
      meetup.tags = meetup.tags;
    } else {
      meetup.tags.find(item => item == request.tags) ? '' : meetup.tags.push(request.tags);
    }

    if (request.images instanceof Array) {
      request.images.forEach((image) => {
        meetup.images.find(item => item == image) ? '' : meetup.images.push(image);
      });
    } else if (request.images == undefined) {
      meetup.images = meetup.images;
    } else {
      meetup.images.find(item => item == request.images) ? '' : meetup.images.push(request.images);
    }

    const index = helper.getIndex(meetups, meetup.id);
    meetups[index] = meetup;

    helper.writeToFile(filename, meetups);
    return meetups[index];
  }

  static delete(id) {
    meetups.filter(meetup => meetup.id !== parseInt(id));
    helper.writeToFile(filename, meetups);
    return true;
  }
}

export default Meetup;
