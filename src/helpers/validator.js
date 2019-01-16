import Joi from 'joi';
import schema from './schemas/schema.js';

class Validate {

 static validateId(request, response, next) {
   if (Number.isInteger(Number(request.params.id))) {
     next();
   } else {
     return response.status(400).json({
       status: 400,
       error: 'Id must be an integer',
     });
   }
 }


 static validateMeetup(request, response, next) {
   const {
     title, location, date,
   } = request.body;

   const validateObject = {
     title, location, date,
   };

   Joi.validate(validateObject, schema.meetup, (err) => {
     if (err) {
       return response.status(400).json({
         status: 400,
         error: err.details[0].message,
       });
     }
     if (!isNaN(title)) {
       response.status(400).json({
         status: 400,
         error: 'title should not be a number',
       });
     } else if (!isNaN(location)) {
       response.status(400).json({
         status: 400,
         error: 'location should not be a number',
       });
     } 
     else next();
   });
 }

 static validateQuestion(request, response, next) {
   const {
     title, body, user_id, meetup_id,
   } = request.body;

   const validateObject = {
     title, body, user_id, meetup_id,
   };

   Joi.validate(validateObject, schema.question, (err) => {
     if (err) {
       return response.status(400).json({
         status: 400,
         error: err.details[0].message,
       });
     }
     if (!isNaN(title)) {
       response.status(400).json({
         status: 400,
         error: 'title should be a string',
       });
     } else if (!isNaN(body)) {
       response.status(400).json({
         status: 400,
         error: 'body should not be a number',
       });
     } else next();
   });
 }
 static validateUser(request, response, next) {
   const {
     firstname,lastname,othername,username,email,isAdmin,password
   } = request.body;

   const validateObject = {
    firstname,lastname,othername,username,email,isAdmin,password
   };

   Joi.validate(validateObject, schema.question, (err) => {
     if (err) {
       return response.status(400).json({
         status: 400,
         error: err.details[0].message,
       });
     }
     if (isNaN(isAdmin) || isAdmin > 1) {
       response.status(400).json({
         status: 400,
         error: 'Admin status can only be 1 or 0',
       });
     } else next();
   });
 }

 static validateComment(request, response, next) {
   const {
     user_id, question_id, comment
   } = request.body;

   const validateObject = {
     user_id, question_id, comment
   };

   Joi.validate(validateObject, schema.question, (err) => {
     if (err) {
       return response.status(400).json({
         status: 400,
         error: err.details[0].message,
       });
     } 
     else next();
   });
 } 

 static validateRsvps(request, response, next) {
   const {
     user_id, question_id, status
   } = request.body;

   const validateObject = {
     user_id, question_id, status
   };

   Joi.validate(validateObject, schema.question, (err) => {
     if (err) {
       return response.status(400).json({
         status: 400,
         error: err.details[0].message,
       });
     } 
     else next();
   });
 }



}
export default Validate;