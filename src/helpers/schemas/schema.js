import Joi from 'joi';

const meetup = 
	Joi.object().keys({
   title: Joi.string().trim().min(3).required(),
   location: Joi.string().trim().min(3).required(),
   happeningOn: Joi.date().iso().required()
});

const question = 
	Joi.object().keys({
   createdBy: Joi.number().required(),
   meetup: Joi.number().required(),
   title: Joi.string().trim().min(3).required(),
   body: Joi.string().trim().min(3).required()
});

export default {
	meetup,
	question
}