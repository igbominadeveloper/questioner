const expect = require('expect');
const meetup = require('../src/controllers/meetupController.js');
const meetupFile = require('../src/data/meetups.json');

describe('Meetups', () => {
  it('returns all created meetups', () => {
    expect(meetup.all()).toBe(true);
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
    expect(meetup.create(request)).toBeInstanceOf(String);
  });

  // it('can write to the json file', () => {
  //   expect(meetupFile).toBeInstanceOf(String);    
  // });
  it('can update a Meetup', () => {
    const request = {
      topic: "New Topic",
      location: "New Location",
      images: [],
      happeningOn: "New Date",
      tags: [],
    };
    expect(meetup.update(request)).toBeInstanceOf(Object);
  });  
});
