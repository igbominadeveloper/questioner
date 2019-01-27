'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetupController = require('../controllers/meetupController');

var _meetupController2 = _interopRequireDefault(_meetupController);

var _questionsController = require('../controllers/questionsController');

var _questionsController2 = _interopRequireDefault(_questionsController);

var _rsvpController = require('../controllers/rsvpController');

var _rsvpController2 = _interopRequireDefault(_rsvpController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _validator = require('../helpers/validator');

var _validator2 = _interopRequireDefault(_validator);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _auth = require('../middlewares/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (request, response) {
  response.status(200).send('Welcome to questioner API');
});
router.get('/api/v1/meetups', _auth2.default.verifyToken, _meetupController2.default.index);
router.get('/api/v1/meetups/upcoming', _auth2.default.verifyToken, _meetupController2.default.upcoming);
router.post('/api/v1/meetups', [_auth2.default.verifyToken, _validator2.default.validateMeetup], _meetupController2.default.create);
router.get('/api/v1/meetups/:id', [_auth2.default.verifyToken, _validator2.default.validateId], _meetupController2.default.show);
router.patch('/api/v1/meetups/:id', [_auth2.default.verifyToken, _validator2.default.validateId], _meetupController2.default.update);
router.post('/api/v1/meetups/:id/tags', [_auth2.default.verifyToken, _validator2.default.validateId, _validator2.default.validateMeetupTag], _meetupController2.default.update);
router.post('/api/v1/meetups/:id/images', [_auth2.default.verifyToken, _validator2.default.validateId, _validator2.default.validateMeetupImage], _meetupController2.default.update);
router.delete('/api/v1/meetups/:id', [_auth2.default.verifyToken, _validator2.default.validateId], _meetupController2.default.destroy);
router.get('/api/v1/meetups/:id/rsvps', [_auth2.default.verifyToken, _validator2.default.validateId], _rsvpController2.default.index);
router.post('/api/v1/meetups/:id/rsvps', [_auth2.default.verifyToken, _validator2.default.validateId, _validator2.default.validateRsvps], _rsvpController2.default.create);
router.post('/api/v1/questions', [_auth2.default.verifyToken, _validator2.default.validateQuestion], _questionsController2.default.create);
router.get('/api/v1/questions', _auth2.default.verifyToken, _questionsController2.default.index);
router.get('/api/v1/questions/:id', [_auth2.default.verifyToken, _validator2.default.validateId], _questionsController2.default.show);
router.patch('/api/v1/questions/:id/upvote', [_auth2.default.verifyToken, _validator2.default.validateId], _questionsController2.default.vote);
router.patch('/api/v1/questions/:id/downvote', [_auth2.default.verifyToken, _validator2.default.validateId], _questionsController2.default.vote);
router.post('/api/v1/auth/signup', _validator2.default.validateNewUser, _helper2.default.checkEmailDuplication, _userController2.default.register);
router.post('/api/v1/auth/login', _validator2.default.validateOldUser, _userController2.default.login);
router.post('/api/v1/comments', _validator2.default.validateComment, _questionsController2.default.createComment);
router.patch('/api/v1/auth/admin', _auth2.default.verifyToken, _userController2.default.admin);
exports.default = router;