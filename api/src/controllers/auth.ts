import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { route } from '../config/utils';
require('dotenv').config();

export const register = route(async (req, res) => {
  const { name, email, password } = req.body;

  const exisitngUser = await User.findOne({ email });

  if (exisitngUser) {
    return res.status(401).json({
      message: 'User already Exists',
    });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await new User({
    name,
    email,
    password: hashedPass,
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
    return res.json({
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

  if (!process.env.SECRET) throw new Error('Environment Invalid');

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.SECRET
  );

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
