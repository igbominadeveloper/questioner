import Joi from 'joi';
/**
 * set meetup validation schema
 * 
 * @constant meetup
 */

const meetup = Joi.object().keys({
  topic: Joi.string().trim().min(3).required(),
  location: Joi.string().trim().min(3).required(),
  date: Joi.date().iso().required(),
});

/**
 * set meetupTag validation schema
 *
 * @constant meetupTag
 */

const meetupTag = Joi.object().keys({
  tags: Joi.string().trim().min(2).required(),
});

/**
 * set meetupImage validation schema
 *
 * @constant meetupImage
 */

const meetupImage = Joi.object().keys({
  images: Joi.string().trim().min(2).required(),
});

/**
 * set question validation schema
 *
 * @constant question
 */

const question = Joi.object().keys({
  user_id: Joi.number().integer().positive().required(),
  meetup_id: Joi.number().integer().positive().required(),
  title: Joi.string().trim().min(3).required(),
  body: Joi.string().trim().min(3).required(),
});

/**
 * set comment validation schema
 *
 * @constant comment
 */

const comment = Joi.object().keys({
  user_id: Joi.number().integer().positive().required(),
  question_id: Joi.number().integer().positive().required(),
  topic: Joi.string().trim().required(),
  comment: Joi.string().trim().required(),
});

/**
 * set newUser validation schema
 *
 * @constant newUser
 */

const newUser = Joi.object().keys({
  firstname: Joi.string().trim().min(3).required(),
  lastname: Joi.string().trim().min(3).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

/**
 * set oldUser validation schema
 *
 * @constant oldUser
 */

const oldUser = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().trim().required(),
});

/**
 * set userUpdate validation schema
 *
 * @constant userUpdate
 */

const userUpdate = Joi.object().keys({
  firstname: Joi.string().trim().min(3),
  lastname: Joi.string().trim().min(3),
  othername: Joi.string().trim().min(3),
  username: Joi.string().trim().min(3),
  phonenumber: Joi.number().integer().positive(),
});
/**
 * set rsvps validation schema
 *
 * @constant rsvps
 */

const rsvps = Joi.object().keys({
  status: Joi.string().trim().valid(['yes', 'no', 'maybe']).required(),
});

/**
 * export validation schema object
 *
 * @exports {Object} Schema
 */

export default {
  meetup,
  question,
  comment,
  oldUser,
  newUser,
  userUpdate,
  rsvps,
  meetupTag,
  meetupImage,
};
