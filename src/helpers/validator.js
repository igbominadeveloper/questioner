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
     title, location, happeningOn,
   } = request.body;

   const validateObject = {
     title, location, happeningOn,
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
     title, body, createdBy, meetup,
   } = request.body;

   const validateObject = {
     title, body, createdBy, meetup,
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

}
export default Validate;