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

  await sendVerificationMail(user._id);

  res.status(200).json({
    message: 'User Created Succesfully',
  });
});

export const login = route(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password').lean();

  const check = await bcrypt.compare(password, user.password);

  if (!check || !user) {
    return res.status(401).json({
      message: 'Email or Password is Incorrect',
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: 'User not verified',
    });
  }

  if (!process.env.SECRET || !process.env.SECRET_2)
    throw new Error('Environment Invalid');

  const token = jwt.sign({ ...user, password: undefined }, process.env.SECRET, {
    expiresIn: '7d',
  });

  // const refreshToken = jwt.sign({ user: user._id }, process.env.SECRET_2, {
  //   expiresIn: '7d',
  // });

  res.status(200).send({
    token,
  });
});

export const verifyUser = route(async (req, res) => {
  if (!process.env.SECRET) throw new Error('Environment Invalid');
  const { id }: any = jwt.verify(req.params.token, process.env.SECRET);
  await User.updateOne({ _id: id }, { verified: true });
  //TODO: change
  res.send('Verified');
});

const sendVerificationMail = (id: string) => {
  if (!process.env.SECRET) throw new Error('Environment Invalid');
  const token = jwt.sign({ id }, process.env.SECRET);

  // await mailer({
  //   from: 'akhildoesdev@gmail.com',
  //   to: 'akhildoesdev@gmail.com',
  //   subject: 'Test',
  //   text: `http://localhost:1337/auth/validate/${token}`,
  // });
};
