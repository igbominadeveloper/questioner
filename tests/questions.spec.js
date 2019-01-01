import expect from 'expect';
import axios from 'axios';
import meetup from '../src/models/Meetup.js';

describe('Question', () => {
	it.only('has its route registered in the routes file', () => {
		expect(axios.post('/api/v1/questions')
		       .then(response => )
		       ).toContain('status:200');
	});
});