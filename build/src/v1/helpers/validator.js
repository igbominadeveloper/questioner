'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _schema = require('./schemas/schema');

var _schema2 = _interopRequireDefault(_schema);

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Validate = function () {
  function Validate() {
    (0, _classCallCheck3.default)(this, Validate);
  }

  (0, _createClass3.default)(Validate, null, [{
    key: 'validateId',
    value: function validateId(request, response, next) {
      if ((0, _isInteger2.default)(Number(request.params.id))) {
        next();
      } else {
        return response.status(400).json({
          status: 400,
          error: 'Id must be an integer'
        });
      }
    }
  }, {
    key: 'validateMeetup',
    value: function validateMeetup(request, response, next) {
      var _request$body = request.body,
          topic = _request$body.topic,
          location = _request$body.location,
          date = _request$body.date;


      var validateObject = {
        topic: topic, location: location, date: date
      };

      _joi2.default.validate(validateObject, _schema2.default.meetup, function (err) {
        if (err) {
          return response.status(400).json({
            status: 400,
            error: err.details[0].message
          });
        }
        if (!isNaN(topic)) {
          response.status(400).json({
            status: 400,
            error: 'topic should not be a number'
          });
        } else if (!isNaN(location)) {
          response.status(400).json({
            status: 400,
            error: 'location should not be a number'
          });
        } else next();
      });
    }
  }, {
    key: 'validateQuestion',
    value: function validateQuestion(request, response, next) {
      var _request$body2 = request.body,
          title = _request$body2.title,
          body = _request$body2.body,
          user_id = _request$body2.user_id,
          meetup_id = _request$body2.meetup_id;


      var validateObject = {
        title: title, body: body, user_id: user_id, meetup_id: meetup_id
      };

      _joi2.default.validate(validateObject, _schema2.default.question, function (err) {
        if (err) {
          return response.status(400).json({
            status: 400,
            error: err.details[0].message
          });
        }
        if (!isNaN(title)) {
          response.status(400).json({
            status: 400,
            error: 'title should be a string'
          });
        } else if (!isNaN(body)) {
          response.status(400).json({
            status: 400,
            error: 'body should not be a number'
          });
        } else next();
      });
    }
  }, {
    key: 'validateNewUser',
    value: function validateNewUser(request, response, next) {
      var _request$body3 = request.body,
          firstname = _request$body3.firstname,
          lastname = _request$body3.lastname,
          email = _request$body3.email,
          password = _request$body3.password;


      var validateObject = {
        firstname: firstname, lastname: lastname, email: email, password: password
      };

      _joi2.default.validate(validateObject, _schema2.default.newUser, function (err) {
        if (err) {
          return response.status(400).json({
            status: 400,
            error: err.details[0].message
          });
        }
        next();
      });
    }
  }, {
    key: 'validateOldUser',
    value: function validateOldUser(request, response, next) {
      var _request$body4 = request.body,
          email = _request$body4.email,
          password = _request$body4.password;


      var validateObject = {
        email: email, password: password
      };

      _joi2.default.validate(validateObject, _schema2.default.oldUser, function (err) {
        if (err) {
          return response.status(400).json({
            status: 400,
            error: err.details[0].message
          });
        }next();
      });
    }
  }, {
    key: 'validateComment',
    value: function validateComment(request, response, next) {
      var _request$body5 = request.body,
          user_id = _request$body5.user_id,
          question_id = _request$body5.question_id,
          topic = _request$body5.topic,
          comment = _request$body5.comment;


      var validateObject = {
        user_id: user_id, question_id: question_id, topic: topic, comment: comment
      };

      _joi2.default.validate(validateObject, _schema2.default.comment, function (err) {
        if (err) {
          return response.status(400).json({
            status: 400,
            error: err.details[0].message
          });
        }
        next();
      });
    }
  }, {
    key: 'validateRsvps',
    value: function validateRsvps(request, response, next) {
      var status = request.body.status;


      var validateObject = {
        status: status
      };

      _joi2.default.validate(validateObject, _schema2.default.rsvps, function (err) {
        if (err) {
          return response.status(400).json({
            status: 400,
            error: err.details[0].message
          });
        }
        next();
      });
    }
  }, {
    key: 'validateMeetupTag',
    value: function validateMeetupTag(request, response, next) {
      var tags = request.body.tags;

      var validateObject = { tags: tags };

      _joi2.default.validate(validateObject, _schema2.default.meetupTag, function (error) {
        if (error) {
          return _helper2.default.errorResponse(response, {
            status: 400,
            error: error.details[0].message
          });
        }
        next();
      });
    }
  }, {
    key: 'validateMeetupImage',
    value: function validateMeetupImage(request, response, next) {
      var images = request.body.images;

      var validateObject = { images: images };

      _joi2.default.validate(validateObject, _schema2.default.meetupImage, function (error) {
        if (error) {
          return _helper2.default.errorResponse(response, {
            status: 400,
            error: error.details[0].message
          });
        }
        next();
      });
    }
  }]);
  return Validate;
}(); /* eslint-disable camelcase */


exports.default = Validate;