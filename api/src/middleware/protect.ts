import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1] || '';

    if (!process.env.SECRET) throw new Error('Environment Invalid');
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Auth Failed',
    });
  }
};
