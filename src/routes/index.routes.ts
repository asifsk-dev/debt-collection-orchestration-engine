import { Router } from 'express';

import authRouter from './auth';
import caseRouter from './cases';
import assignRouter from './assignements';
import analyticsRouter from './analytics';

const router = Router();

// Mount routes
router.use('/auth', authRouter);
router.use('/cases', caseRouter);
router.use('/assign', assignRouter);
router.use('/analytics', analyticsRouter);


export default router;
