import express from 'express';
import meetupController from '../controllers/meetupController';
import questionsController from '../controllers/questionsController';
import rsvpController from '../controllers/rsvpController';

const router = express.Router();

router.get('/api/v1/meetups', meetupController.index);
router.post('/api/v1/meetups', meetupController.create);
router.get('/api/v1/meetups/:id', meetupController.show);
router.post('/api/v1/meetups/:id/rsvps', rsvpController.create);
router.post('/api/v1/questions', questionsController.create);
router.get('/api/v1/questions', questionsController.index);
router.get('/api/v1/questions/:id', questionsController.show);
router.patch('/api/v1/questions/:id/upvote', questionsController.vote);
router.patch('/api/v1/questions/:id/downvote', questionsController.vote);

export default router;
