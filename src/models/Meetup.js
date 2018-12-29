import path from 'path';
import helper from '../helpers/helper.js';
import meetups from '../data/meetups.json';
const filename = path.resolve(__dirname, '../data/meetups.json');

class Meetup {
  static all() {
    return meetups;
  }

  static latest() {
    return meetups.sort();
  }

  static find(id) {
    return helper.exists(meetups, id);
  }

  static create(payload) {
    if (payload) {
      const id = helper.getNewId(meetups);
      const meetup = {
        id,
        topic: payload.topic,
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
  }
}
    
//   }


//   static update(id, request) {
//     helper.exists(meetups, id)
//       .then((response) => {
//         const fetchedMeetup = {} = response.body; let
//           request;
//         const index = meetups.findIndex(request.params.id);
//         meetups[index] = fetchedMeetup;
//         helper.writeToFile(filename, meetups);
//         return meetups[index];
//       })
//       .catch(error => error.error);
//   }

//   static delete(id) {
//     helper.exists(meetups, id)
//       .then((response) => {
//         const filtered = meetups.filter(meetup => meetup.id !== id);
//         helper.writeToFile(filename, filtered);
//         return response.body;
//       })
//       .catch(error => error.error);
//   }
// }

export default Meetup;