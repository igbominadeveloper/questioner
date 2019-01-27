'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetup = _joi2.default.object().keys({
  topic: _joi2.default.string().trim().min(3).required(),
  location: _joi2.default.string().trim().min(3).required(),
  date: _joi2.default.date().iso().required()
});

var meetupTag = _joi2.default.object().keys({
  tags: _joi2.default.string().trim().min(2).required()
});

var meetupImage = _joi2.default.object().keys({
  images: _joi2.default.string().trim().min(2).required()
});

var question = _joi2.default.object().keys({
  user_id: _joi2.default.number().integer().positive().required(),
  meetup_id: _joi2.default.number().integer().positive().required(),
  title: _joi2.default.string().trim().min(3).required(),
  body: _joi2.default.string().trim().min(3).required()
});

var comment = _joi2.default.object().keys({
  user_id: _joi2.default.number().integer().positive().required(),
  question_id: _joi2.default.number().integer().positive().required(),
  topic: _joi2.default.string().trim().required(),
  comment: _joi2.default.string().trim().required()
});

var newUser = _joi2.default.object().keys({
  firstname: _joi2.default.string().trim().min(3).required(),
  lastname: _joi2.default.string().trim().min(3).required(),
  email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
  password: _joi2.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});

var oldUser = _joi2.default.object().keys({
  email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
  password: _joi2.default.string().trim().required()
});

var rsvps = _joi2.default.object().keys({
  status: _joi2.default.string().trim().valid(['yes', 'no', 'maybe']).required()
});

exports.default = {
  meetup: meetup,
  question: question,
  comment: comment,
  oldUser: oldUser,
  newUser: newUser,
  rsvps: rsvps,
  meetupTag: meetupTag,
  meetupImage: meetupImage
};