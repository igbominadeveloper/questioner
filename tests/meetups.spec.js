const expect = require('expect');
const meetup = require('../src/models/Meetup.js');

describe('Meetups', () => {
  it('returns all created meetups', () => {
    expect(meetup.all().length > 0).toBe(true);
  });

  it('can return a specific meetup', () => {
    expect(meetup.find(1).id).toBe(1);
  });

  it('can create a new Meetup', () => {
    const request = {
      topic: "New Topic",
      location: "Lagos, Nigeria",
      images: [],
      createdOn: new Date().toLocaleString(),
      happeningOn: '21-02-2019',
      tags: [],
    };
    expect(meetup.create(request)).toBeInstanceOf(Array);
  });
});
