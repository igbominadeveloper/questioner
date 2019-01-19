import Joi from 'joi';

const meetup = 	Joi.object().keys({
  topic: Joi.string().trim().min(3).required(),
  location: Joi.string().trim().min(3).required(),
  date: Joi.date().iso().required(),
});

const question = 	Joi.object().keys({
  user_id: Joi.number().integer().positive().required(),
  meetup_id: Joi.number().integer().positive().required(),
  title: Joi.string().trim().min(3).required(),
  body: Joi.string().trim().min(3).required(),
});

const comment = Joi.object().keys({
  user_id: Joi.number().integer().positive().required(),
  question_id: Joi.number().integer().positive().required(),
  topic: Joi.string().trim().required(),
  comment: Joi.string().trim().required(),
});

const newUser = Joi.object().keys({
  firstname: Joi.string().trim().min(3).required(),
  lastname: Joi.string().trim().min(3).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

const oldUser = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().trim().required(),
});

const rsvps = Joi.object().keys({
  status: Joi.string().trim().valid(['yes', 'no', 'maybe']).required(),
});

export default {
  meetup,
  question,
  comment,
  oldUser,
  newUser,
  rsvps,
};
