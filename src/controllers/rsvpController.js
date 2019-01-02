import rsvp from '../models/Rsvp';
import rsvps from '../data/rsvp.json';
import meetup from '../models/Meetup';
import helper from '../helpers/helper';

class RsvpController {
	static create(request, response) {
		const rsvpMeetup = meetup.find(request.params.id); 
		if(rsvpMeetup){
			const payload = {
				id: helper.getNewId(rsvps)
			};	
			return response.status(200).json({
				status: 200,
				data: payload
			});	
		}
		return response.status(400).json({
				status: 400,
				data: `Invalid ID, Meetup not found`
			});	
	}

}
export default RsvpController