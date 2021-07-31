import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { route } from '../config/utils';
require('dotenv').config();

export const register = route(async (req, res) => {
  const { name, username, email, password } = req.body;

  const [exisitngUser, exisitngUsername] = await Promise.all([
    User.findOne({ email }),
    User.findOne({ username }),
  ]);

  if (exisitngUser) {
    return res.status(401).json({
      message: 'User already Exists',
    });
  }

  if (exisitngUsername) {
    return res.status(401).json({
      message: 'Username already in use',
    });
  }

  const user = await new User({
    name,
    email,
    username,
    password,
  }).save();

  if (!process.env.SECRET) throw new Error('Environment Invalid');
  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  // await mailer({
  //   from: 'akhildoesdev@gmail.com',
  //   to: 'akhildoesdev@gmail.com',
  //   subject: 'Test',
  //   text: `http://localhost:1337/auth/validate/${token}`,
  // });

  res.status(200).json({
    message: 'User Created Succesfully',
  });
});

export const login = route(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      message: 'User does not exist',
    });
  }

  const check = await bcrypt.compare(password, user.password);

  if (!check) {
    return res.status(401).json({
      message: 'Auth failed',
    });
  }

  if (!user.verified) {
    return res.json({
      message: 'User not verified',
    });
  }

  if (!process.env.SECRET || !process.env.SECRET_2)
    throw new Error('Environment Invalid');

  const accessToken = jwt.sign({ user: user._id }, process.env.SECRET, {
    expiresIn: '1m',
  });

  const refreshToken = jwt.sign({ user: user._id }, process.env.SECRET_2, {
    expiresIn: '7d',
  });

  res.status(200).send({
    accessToken,
    refreshToken,
  });
});

export const verifyUser = route(async (req, res) => {
  if (!process.env.SECRET) throw new Error('Environment Invalid');
  const { id }: any = jwt.verify(req.params.token, process.env.SECRET);
  await User.updateOne({ _id: id }, { verified: true });
  //TODO: change
  res.send('Verified');
});