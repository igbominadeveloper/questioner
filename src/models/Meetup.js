import path from 'path';
import helper from '../helpers/helper';
import meetups from '../data/meetups.json';
import testData from '../../tests/testData';
import moment from 'moment';

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
        createdOn: moment(new Date()) ,
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
      images,
      happeningOn,
      tags 
    } = request;
    
    meetup.title = title;
    meetup.location = location;
    meetup.happeningOn = happeningOn;

    if(tags instanceof Array){
      tags.forEach(tag => {
        meetup.tags.find(item => item == tag) ? '' : meetup.tags.push(tag);
      })
    }
    else {
      meetup.tags.find(item => item == tags) ? '' : meetup.tags.push(tags);
    }

    if(images instanceof Array){
      images.forEach(image => {
        meetup.images.find(item => item == image) ? '' : meetup.images.push(image);
      })
    }
    else {
      meetup.images.find(item => item == images) ? '' : meetup.images.push(images);
    }

    const index = helper.getIndex(meetups, meetup.id);
    meetups[index] = meetup;

    helper.writeToFile(filename, meetups);
    return meetups[index]; 
  }

  static delete(id){
    meetups.filter(meetup => meetup.id !== parseInt(id));
    helper.writeToFile(filename, meetups);
    return true;
  }

  
}

export default Meetup;
