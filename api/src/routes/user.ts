import express from 'express';
import {
  getProfilebyId,
  updateProfile,
  addQuestionToList,
  removeQuestionFromList,
} from '../controllers/user';

const router = express.Router();

router.get('/profile/:id', getProfilebyId);
router.put('/profile/update', updateProfile);
// router.patch('/share/increment/:id', incrementShare);
// router.patch('/like/:id', like);
// router.patch('/unlike/:id', unlike);

export default router;
