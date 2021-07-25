import express from 'express';
import { login, register, verifyUser } from '../controllers/auth';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify/:token', verifyUser);

export default router;
