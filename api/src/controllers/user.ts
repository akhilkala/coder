import { route } from '../config/utils';
import User from '../models/User';

export const checkUsernameAvailability = route(async (req, res) => {
  const { username } = req.params;

  // TODO: Change
  if (!username) throw new Error('Illegal req');

  const existingUser = await User.findOne({ username });

  res.status(200).json({
    usernameTaken: !!existingUser,
  });
});

export const getProfilebyId = route(async (req, res) => {});

export const updateProfile = route(async (req, res) => {});

export const addQuestionToList = route(async (req, res) => {});

export const removeQuestionFromList = route(async (req, res) => {});

export const addFreind = route(async (req, res) => {});

export const removeFreind = route(async (req, res) => {});
