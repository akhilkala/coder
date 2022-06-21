import { route } from "../config/utils";
import User from "../models/User";

export const checkUsernameAvailability = route(async (req, res) => {
  const { username } = req.params;

  // TODO: Change
  if (!username) throw new Error("Illegal req");

  const existingUser = await User.findOne({ username });

  res.status(200).json({
    usernameTaken: !!existingUser,
  });
});

export const getProfilebyUsername = route(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).lean();

  res.status(200).json(user);
});

export const updateProfile = route(async (req, res) => {});

export const addQuestionToList = route(async (req, res) => {});

export const removeQuestionFromList = route(async (req, res) => {});

export const addFreind = route(async (req, res) => {
  const { id } = req.params;

  await User.updateOne(
    { id: req.user._id },
    {
      $push: {
        friendRequests: id,
      },
    }
  );
  res.status(200).json({
    success: true,
  });
});

export const removeFreind = route(async (req, res) => {});
