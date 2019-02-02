import express from 'express';
import meetupController from '../controllers/meetupController';
import questionsController from '../controllers/questionsController';
import rsvpController from '../controllers/rsvpController';
import userController from '../controllers/userController';
import Validator from '../helpers/validator';
import helper from '../helpers/helper';
import Auth from '../middlewares/auth';

const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).send('Welcome to questioner API');
});
router.get('/api/v1/meetups', Auth.verifyToken, meetupController.index);
router.get('/api/v1/meetups/upcoming', Auth.verifyToken, meetupController.upcoming);
router.post('/api/v1/meetups', [Auth.verifyToken, Validator.validateMeetup], meetupController.create);
router.get('/api/v1/meetups/:id', [Auth.verifyToken, Validator.validateId], meetupController.show);
router.patch('/api/v1/meetups/:id', [Auth.verifyToken, Validator.validateId], meetupController.update);
router.post('/api/v1/meetups/:id/tags', [Auth.verifyToken, Validator.validateId, Validator.validateMeetupTag], meetupController.update);
router.post('/api/v1/meetups/:id/images', [Auth.verifyToken, Validator.validateId, Validator.validateMeetupImage], meetupController.update);
router.delete('/api/v1/meetups/:id', [Auth.verifyToken, Validator.validateId], meetupController.destroy);
router.get('/api/v1/meetups/:id/rsvps', [Auth.verifyToken, Validator.validateId], rsvpController.index);
router.post('/api/v1/meetups/:id/rsvps', [Auth.verifyToken, Validator.validateId, Validator.validateRsvps], rsvpController.create);
router.post('/api/v1/questions', [Auth.verifyToken, Validator.validateQuestion], questionsController.create);
router.get('/api/v1/questions', Auth.verifyToken, questionsController.index);
router.get('/api/v1/questions/:id', [Auth.verifyToken, Validator.validateId], questionsController.show);
router.patch('/api/v1/questions/:id/upvote', [Auth.verifyToken, Validator.validateId], questionsController.vote);
router.patch('/api/v1/questions/:id/downvote', [Auth.verifyToken, Validator.validateId], questionsController.vote);
router.post('/api/v1/auth/signup', Validator.validateNewUser, helper.checkEmailDuplication, userController.register);
router.post('/api/v1/auth/login', Validator.validateOldUser, userController.login);
router.patch('/api/v1/user/:id', Validator.validateId, userController.show);
router.post('/api/v1/comments', Validator.validateComment, questionsController.createComment);
router.patch('/api/v1/auth/admin', Auth.verifyToken, userController.admin);
export default router;
