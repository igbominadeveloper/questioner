import meetup from '../models/Meetup.js';
import helper from '../helpers/helper.js';
import meetups from '../data/meetups.json';

class meetupController {
   static index(request, response) {
    let data = meetup.all();
    if(data.length > 0){
      return response.json({
        status: 200,
        data: data
      })
    }
    return response.json({
      status: 404,
      message: `No Meetups available`
    })
  }

  static show(request, response) {
    let data = meetup.find(request.params.id);
    if(data !== false){
      return response.json({
        status: 200,
        data: data
      })
    }
    return response.json({
      status: 404,
      message: `Model doesn't exist`
    })
  }
}

export default meetupController;