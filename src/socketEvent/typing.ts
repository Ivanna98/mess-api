import { IUser } from '../models/user';

export const typingEvent = (socket: SocketIO.Socket, user: IUser) => {
  socket.on('typing', (channelId) => {
    socket.broadcast.emit(`userTyping${channelId}`, user.name);
  });
};
