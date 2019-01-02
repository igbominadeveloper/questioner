import expect from 'expect';
import Rsvp from '../src/models/Rsvp';
import axios from 'axios';
import RsvpController from '../src/controllers/rsvpController.js';
import 

describe('Rsvp', () => {
	it('can exposes a create method', () => {
		expect(Rsvp).toHaveProperty('create');
	});

	it('returns an error message when meetup ID is invalid', () => {
		// expect(RsvpController.create()).toHaveProperty('status').toBe(200);
	});
});