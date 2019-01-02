import expect from 'expect';
import axios from 'axios';
import http from 'http';
import path from 'path';
import question from '../src/models/Question';
import questionsController from '../src/controllers/questionsController';
import helper from '../src/helpers/helper';
const filename = path.resolve(__dirname, '../src/data/questions.json');
import questions from '../src/data/questions.json';

describe('Question', () => {
  // it('has a route handling all /questions requests', () => {
  //   expect(http.get('/api/v1/meetups')).toBeInstanceOf(Function);
  // });

	it('returns a custom message when payload is not included in the request', () => {
  	expect(question.create()).toBe(false);
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

  it('should always have a positive vote value', () => {
  	let randomQuestion = question.find(1);
  	expect(randomQuestion.votes >= 0).toBe(true);
  	question.downvote(randomQuestion.id);
  	question.downvote(randomQuestion.id);
  	question.downvote(randomQuestion.id);
  	question.downvote(randomQuestion.id);
  	question.downvote(randomQuestion.id);
  	question.upvote(randomQuestion.id);
  	expect(question.find(1).votes).toBe(1);
  	question.downvote(randomQuestion.id);
  	question.downvote(randomQuestion.id);
  	question.downvote(randomQuestion.id);
  	expect(question.find(1).votes).toBe(0);
  	expect(randomQuestion.votes >= 0).toBe(true);
  });
});