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
      topic, location, date,
    } = request.body;

    const validateObject = {
      topic, location, date,
    };

    Joi.validate(validateObject, schema.meetup, (err) => {
      if (err) {
        return response.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      if (!isNaN(topic)) {
        response.status(400).json({
          status: 400,
          error: 'topic should not be a number',
        });
      } else if (!isNaN(location)) {
        response.status(400).json({
          status: 400,
          error: 'location should not be a number',
        });
      } else next();
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

  static validateNewUser(request, response, next) {
    const {
      firstname, lastname, othername, username, email, password,
    } = request.body;

    const validateObject = {
      firstname, lastname, othername, username, email, password,
    };

    Joi.validate(validateObject, schema.newUser, (err) => {
      if (err) {
        return response.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      next();
    });
  }

  static validateOldUser(request, response, next) {
    const {
      email, password,
    } = request.body;

    const validateObject = {
      email, password,
    };

    Joi.validate(validateObject, schema.oldUser, (err) => {
      if (err) {
        return response.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      } next();
    });
  }

  static validateComment(request, response, next) {
    const {
      user_id, question_id, comment,
    } = request.body;

    const validateObject = {
      user_id, question_id, comment,
    };

    Joi.validate(validateObject, schema.comment, (err) => {
      if (err) {
        return response.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      next();
    });
  }

  static validateRsvps(request, response, next) {
    const {
      user_id, status, meetup_id, topic,
    } = request.body;

    const validateObject = {
      user_id, status, meetup_id, topic,
    };

    Joi.validate(validateObject, schema.rsvps, (err) => {
      if (err) {
        return response.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      next();
    });
  }
}
export default Validate;
