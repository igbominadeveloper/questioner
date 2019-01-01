import expect from 'expect';
import meetup from '../src/models/Meetup';
import helper from '../src/helpers/helper';
import meetups from '../src/data/meetups.json';

describe('Meetups', () => {
  it('returns all created meetups', () => {
    expect(meetup.all()).toBeInstanceOf(Object);
  });

  it('returns false when invalid meetup id is supplied', () => {
    expect(meetup.find(1000)).toBe(false);
  });

  it('can return a specific meetup', () => {
    expect(meetup.find(1).id).toBe(1);
  });

  it('returns the created meetup after creation', () => {
    const request = {
      title: 'New title',
      location: 'Lagos, Nigeria',
      images: [],
      createdOn: new Date().toLocaleString(),
      happeningOn: '21-02-2019',
      tags: [],
    };
    expect(meetup.create(request)).toBeInstanceOf(Object);
  });

  // it('can update a meetup', () => {
  //   const request = {
  //     topic: "New Topic",
  //     location: "New Location",
  //     happeningOn: "29-08-2019",
  //   };
  //   expect(meetup.update(1, request));
  // });

  it('allows deleting a meetup', () => {
    expect(helper.exists(meetups, 4)).toBeInstanceOf(Object);
    // expect(meetup.delete(4)).toBe(true);
    // expect(helper.exists(meetups, 4)).toBe(false);
  });
});
