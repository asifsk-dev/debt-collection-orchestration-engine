import { Router } from 'express';
import { validate } from 'express-validation';
import { loginUserValidation } from '../validations/auth';
import { loginUser } from '../controllers/auth';
const router = Router();

// Mount routes
router.post('/login', validate(loginUserValidation, { context: true }, { abortEarly: false }), loginUser);


export default router;
