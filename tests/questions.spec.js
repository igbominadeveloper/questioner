import expect from 'expect';
import axios from 'axios';
import http from 'http';
import question from '../src/models/Question';
import questionsController from '../src/controllers/questionsController';

describe('Question', () => {
  it('has a route handling all /questions requests', () => {
    expect(http.get('/api/v1/meetups')).toBeInstanceOf(Function);
  });
	it('returns a custom message when payload is not included in the request', () => {
  	expect(question.create()).toContain("Request missing complete payload. Confirm it includes - meetup, title and the body of a question");
	});
  it('can create a new question resource', () => {
  	let request = {
			meetup: 2,
			createdBy: 4,
			title: "Question title",
			body: "Question body"
  	};
  	expect(request).toBeInstanceOf(Object);
  	expect(isNaN(parseInt(request.meetup))).toBe(false);
  	expect(isNaN(parseInt(request.body))).toBe(true);
  	expect(isNaN(parseInt(request.createdBy))).toBe(false);
  	expect(isNaN(parseInt(request.title))).toBe(true);
  	expect(question.create(request)).toBeInstanceOf(Object);
  });

  it('should return a specific question when id is specified', () => {
  	expect(question.find(2).id).toBe(2);
  });

  it('allows upvote and downvote', () => {
  	let randomQuestion = question.find(5);
  	expect(randomQuestion).toBeInstanceOf(Object);
  	expect(randomQuestion.votes).toBe(0);
  	randomQuestion.upvote();
  	expect(randomQuestion.votes).toBe(1);
  });
});
