/* eslint-disable camelcase */
import Joi from 'joi';
import schema from './schemas/schema';
import helper from "./helper";

class Validate {
/**
 *---------------------------------------------
 * Validate 
 *---------------------------------------------
 *
 * This class is responsible for handling
 * input validation using Joi package
 */

  /**
   * validate route id parameter 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
   */

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

   /**
   * validate new meetup inputs 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
   */
  
  static validateMeetup(request, response, next) {
    /**
     * use object destructuring to extract values
     * 
     * @constant {String} topic
     * @constant {String} location
     * @constant {String} date
     * @constant {String} organizerName
     * @constant {String} organizerPhone
     * @constant {String} organizerEmail
     */

    const {
      topic, location, date, organizerName, organizerPhone, organizerEmail
    } = request.body;

     /**
     * convert values to a single object
     * 
     * @key {String} topic
     * @key {String} location
     * @key {String} date
     */

    const validateObject = {
      topic, location, date, organizerName, organizerPhone, organizerEmail
    };

     /**
     * Use Joi to validate each key in the object
     * 
     * @param {Object} validateObject
     * @param {Object} schema.meetup
     * @param {Object} err
     * @return {Object} error if any exists
     */

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

  /**
   * validate new question inputs 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
   */

  static validateQuestion(request, response, next) {

    /**
     * use object destructuring to extract values
     * 
     * @constant {String} title
     * @constant {String} body
     * @constant {String} user_id
     * @constant {String} meetup_id
     */

    const {
      title, body, user_id, meetup_id,
    } = request.body;

    /**
     * convert values to a single object
     * 
     * @key {String} title
     * @key {String} body
     * @key {String} user_id
     */

    const validateObject = {
      title, body, user_id, meetup_id,
    };

    /**
     * Use Joi to validate each key in the object
     * 
     * @param {Object} validateObject
     * @param {Object} schema.question
     * @param {Object} err
     * @return {Object} error if any exists
     */

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

  /**
   * validate new user inputs 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
   */

  static validateNewUser(request, response, next) {

    /**
     * use object destructuring to extract values
     * 
     * @constant {String} firstname
     * @constant {String} lastname
     * @constant {String} email
     * @constant {String} password
     */

    const {
      firstname, lastname, email, password,
    } = request.body;

    /**
     * convert values to a single object
     * 
     * @key {String} firstname
     * @key {String} lastname
     * @key {String} email
     * @key {String} password
     */

    const validateObject = {
      firstname, lastname, email, password,
    };


    /**
     * Use Joi to validate each key in the object
     * 
     * @param {Object} validateObject
     * @param {Object} schema.newUser
     * @param {Object} err
     * @return {Object} error if any exists
     */

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

  /**
   * validate existing user inputs 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
   */

  static validateOldUser(request, response, next) {

     /**
     * use object destructuring to extract values
     * 
     * @constant {String} email
     * @constant {String} password
     */

    const {
      email, password,
    } = request.body;

     /**
     * convert values to a single object
     * 
     * @key {String} email
     * @key {String} password
     */

    const validateObject = {
      email, password,
    };

    /**
     * Use Joi to validate each key in the object
     * 
     * @param {Object} validateObject
     * @param {Object} schema.oldUser
     * @param {Object} err
     * @return {Object} error if any exists
     */

    Joi.validate(validateObject, schema.oldUser, (err) => {
      if (err) {
        return response.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      } next();
    });
  }

  static validateUserProfileUpdate(request, response, next) {
    const {
      firstname, lastname, othername, username, phonenumber,
    } = request.body;

    const validateObject = {
      firstname, lastname, othername, username, phonenumber,
    };

    Joi.validate(validateObject, schema.userUpdate, (err) => {
      if (err) {
        return response.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      } next();
    });
  }

   /**
   * validate new comment inputs 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
   */

  static validateComment(request, response, next) {

    /**
     * use object destructuring to extract values
     * 
     * @constant {String} user_id
     * @constant {String} question_id
     * @constant {String} topic
     * @constant {String} comment
     */

    const {
      user_id, question_id, topic, comment,
    } = request.body;

    /**
     * convert values to a single object
     * 
     * @key {String} user_id
     * @key {String} question_id
     * @key {String} topic
     * @key {String} comment
     */

    const validateObject = {
      user_id, question_id, topic, comment,
    };

    /**
     * Use Joi to validate each key in the object
     * 
     * @param {Object} validateObject
     * @param {Object} schema.comment
     * @param {Object} err
     * @return {Object} error if any exists
     */

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

  /**
   * validate new rsvps input 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
  */

  static validateRsvps(request, response, next) {
    /**
     * use object destructuring to extract values
     * 
     * @constant {String} status
     */

    const {
      status,
    } = request.body;

    /**
     * convert values to a single object
     * 
     * @key {String} status
     */

    const validateObject = {
      status,
    };

    /**
     * Use Joi to validate each key in the object
     * 
     * @param {Object} validateObject
     * @param {Object} schema.rsvps
     * @param {Object} err
     * @return {Object} error if any exists
     */

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

  /**
   * validate meetupTags input 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
   */

  static validateMeetupTag(request, response, next) {
  /**
   * use object destructuring to extract values
   *
   * @constant {String} tags
   */
  
   const { tags } = request.body;
    
    /**
     * convert values to a single object
     * 
     * @key {String} tags
     */

    const validateObject = { tags };

    /**
     * Use Joi to validate each key in the object
     * 
     * @param {Object} validateObject
     * @param {Object} schema.meetupTag
     * @param {Object} err
     * @return {Object} error if any exists
     */

    Joi.validate(validateObject, schema.meetupTag, (error) => {
      if (error) {
        return helper.errorResponse(response, {
          status: 400,
          error: error.details[0].message,
        });
      }
      next();
    });
  }

  /**
   * validate meetupImage input 
   * 
   * @param {Object} request 
   * @param {Object} response 
   * @param {Object} next
   * @return {Object} response if error exists
   */

  static validateMeetupImage(request, response, next) {
    /**
     * use object destructuring to extract values
     * 
     * @constant {String} images
     */

    const { images } = request.body;

     /**
     * convert values to a single object
     * 
     * @key {String} images
     */
    const validateObject = { images };

    /**
     * Use Joi to validate each key in the object
     * 
     * @param {Object} validateObject
     * @param {Object} schema.meetupImage
     * @param {Object} err
     * @return {Object} error if any exists
     */

    Joi.validate(validateObject, schema.meetupImage, (error) => {
      if (error) {
        return helper.errorResponse(response, {
          status: 400,
          error: error.details[0].message,
        });
      }
      next();
    });
  }
}

/**
 * export default Object
 * 
 * @exports {Object} Validate
 */

export default Validate;
