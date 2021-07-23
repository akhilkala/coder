import { Socket } from 'socket.io';

export default (socket: Socket, io: any) => {
  socket.on('create-room', async () => {
    try {
    } catch (err) {
      throw err;
    }
  });
};
