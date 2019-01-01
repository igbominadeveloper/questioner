import expect from 'expect';
import axios from 'axios';
import meetup from '../src/models/Meetup';
import router from '../src/routes';

describe('Question', () => {
  it('has its route registered in the routes file', () => {
    axios.post('/api/v1/questions')
	   .then((response) => {
	   	const payload = response.body;
	   })
	   .catch((error) => {
	   	const payload = error;
	   });
	   expect(curl()).toContain('get');
  });
});
