import express from 'express';
import {
  getProfilebyUsername,
  updateProfile,
  addQuestionToList,
  removeQuestionFromList,
  checkUsernameAvailability,
  addFreind,
} from '../controllers/user';
import protect from '../middleware/protect';

const router = express.Router();

router.get('/check/:username', checkUsernameAvailability);
router.get('/profile/:username', protect, getProfilebyUsername);
router.put('/profile/update', protect, updateProfile);
router.patch('/add-friend/:id', protect, addFreind);

// router.patch('/share/increment/:id', incrementShare);
// router.patch('/like/:id', like);
// router.patch('/unlike/:id', unlike);

export default router;
