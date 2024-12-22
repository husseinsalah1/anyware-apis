import express from 'express';
import userRoutes from './userRoutes';
import quizRoutes from './quizRoutes';
import announcementRoutes from './announcementRoutes';
import authMiddleware from '../middleware/authorizeMiddleware';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/quiz', authMiddleware(['USER', 'TEACHER']), quizRoutes);
router.use('/announcement', authMiddleware(['USER', 'TEACHER']), announcementRoutes);

export default router;
