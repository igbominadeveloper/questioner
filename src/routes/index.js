import express from 'express';
import meetupController from '../controllers/meetupController.js';

const router = express.Router();

router.get('/api/v1/meetups', meetupController.index);
router.post('/api/v1/meetups', meetupController.create);
router.get('/api/v1/meetups/:id', meetupController.show);
// router.put('/api/v1/meetups/:id', meetupController.update);
// router.delete('/api/v1/meetups/:id', meetupController.destroy);

export default router;
