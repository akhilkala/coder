import express from 'express';
import { getAll } from '../controllers/contests';
const router = express.Router();

router.get('/', getAll);

export default router;
