import Joi from 'joi';

const meetup = 
	Joi.object().keys({
   title: Joi.string().trim().min(3).required(),
   location: Joi.string().trim().min(3).required(),
   date: Joi.date().iso().required()
});

const question = 
	Joi.object().keys({
   user_id: Joi.number().integer().positive().required(),
   meetup_id: Joi.number().integer().positive().required(),
   title: Joi.string().trim().min(3).required(),
   body: Joi.string().trim().min(3).required()
});

const comment = 
   Joi.object().keys({
      user_id: Joi.number().integer().positive().required(),
      question_id: Joi.number().integer().positive().required(),
      comment: Joi.string().trim().required()
   });

const user = 
   Joi.object().keys({
      firstname: Joi.string().trim().min(3).required(),
      lastname: Joi.string().trim().min(3).required(),
      othername: Joi.string().trim().min(3).required(),
      username: Joi.string().trim().min(3).required(),
      email: Joi.string().email().required(),
      isAdmin: Joi.number().integer().positive().min(1),
      password: Joi.string().trim().min(5).required()
   });

const rsvps = 
   Joi.object().keys({
      user_id: Joi.number().integer().positive().required(),
      meetup_id: Joi.number().integer().positive().required(),
      response: Joi.string().required(),
   });

export default {
	meetup,
	question,
   comment,
   user,
   rsvps
}