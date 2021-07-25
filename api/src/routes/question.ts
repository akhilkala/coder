import express from 'express';
import {
  getQuestions,
  postQuestion,
  incrementShare,
  like,
  unlike,
} from '../controllers/question';
// import protect from '../middleware/protect';

const router = express.Router();

router.get(
  '/',
  // protect,
  getQuestions
);
router.post('/', postQuestion);
router.patch('/share/increment/:id', incrementShare);
router.patch('/like/:id', like);
router.patch('/unlike/:id', unlike);

export default router;
