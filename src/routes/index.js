import express from 'express';
import meetupController from '../controllers/meetupController';
import questionsController from '../controllers/questionsController';

const router = express.Router();

router.get('/api/v1/meetups', meetupController.index);
router.post('/api/v1/meetups', meetupController.create);
router.get('/api/v1/meetups/:id', meetupController.show);
router.post('/api/v1/questions', questionsController.create);
router.patch('/api/v1/questions/:question/upvote', questionsController.vote);
router.patch('/api/v1/questions/:question/downvote', questionsController.vote);

export default router;
