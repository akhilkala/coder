import express from 'express';
import { getAll } from '../controllers/contest';
const router = express.Router();

router.get('/', getAll);

export default router;
