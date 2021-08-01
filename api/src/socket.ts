import { Socket } from 'socket.io';

export default (socket: Socket, io: any) => {
  socket.on('create', async () => {
    try {
    } catch (err) {
      throw err;
    }
  });
};
