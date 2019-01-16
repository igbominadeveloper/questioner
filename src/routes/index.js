import express from 'express';
import meetupController from '../controllers/meetupController';
import questionsController from '../controllers/questionsController';
import rsvpController from '../controllers/rsvpController';
import Validator from '../helpers/validator';

const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).send('Welcome to questioner API');
});
router.get('/api/v1/meetups', meetupController.index);
router.get('/api/v1/meetups/upcoming', meetupController.upcoming);
router.post('/api/v1/meetups', Validator.validateMeetup, meetupController.create);
router.get('/api/v1/meetups/:question', Validator.validateId, meetupController.show);
router.get('/api/v1/meetups/:id', Validator.validateId, meetupController.show);
router.patch('/api/v1/meetups/:id',  Validator.validateId, meetupController.update);
router.delete('/api/v1/meetups/:id',  Validator.validateId, meetupController.destroy);
router.get('/api/v1/meetups/:id/rsvps',  Validator.validateId, rsvpController.index);
router.post('/api/v1/meetups/:id/rsvps',  Validator.validateId, Validator.validateRsvps, rsvpController.create);
router.post('/api/v1/questions', Validator.validateQuestion, questionsController.create);
router.get('/api/v1/questions', questionsController.index);
router.get('/api/v1/questions/:id', Validator.validateId, questionsController.show);
router.patch('/api/v1/questions/:id/upvote', Validator.validateId, questionsController.vote);
router.patch('/api/v1/questions/:id/downvote',Validator.validateId, questionsController.vote);

export default router;
