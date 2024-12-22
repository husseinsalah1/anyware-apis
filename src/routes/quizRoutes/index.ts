import express from 'express';
import quizRoutes from './quiz.routes';

const router = express.Router();
router.use('/', quizRoutes);

export default router;
