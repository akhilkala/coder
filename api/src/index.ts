import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { CustomError } from './errors';

const socketio = require('socket.io');
import { Socket } from 'socket.io';
import socketHandler from './socket';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import contestRouter from './routes/contest';
import problemRouter from './routes/problem';

const app: Application = express();
dotenv.config();
app.use(express.json());
connectDB();

app.use((req, res, next) => {
  req.url = req.url.slice(4);
  next();
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/contest', contestRouter);
app.use('/problem', problemRouter);

// TODO: https://www.npmjs.com/package/express-validator

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: err.message,
  });
});

const httpServer = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}...`)
);

const io = socketio(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => socketHandler(socket, io));
