import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import { CustomError } from './errors';

const app: Application = express();
dotenv.config();
app.use(cors());
connectDB();

const socketio = require('socket.io');
import { Socket } from 'socket.io';
import socketHandler from './socket';

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
