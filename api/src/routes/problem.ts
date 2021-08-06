import express from 'express';
import { getRandom20 } from '../controllers/problem';
const router = express.Router();

router.get('/random/20', getRandom20);
export default router;
