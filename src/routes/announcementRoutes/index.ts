import express from 'express';
import announcementRoutes from './announcement.routes';

const router = express.Router();
router.use('/', announcementRoutes);

export default router;
