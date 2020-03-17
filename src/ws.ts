import socketioJwt from 'socketio-jwt';
import socketIO from 'socket.io';
import * as userServices from './services/userServices';
import { config } from './config';
import { messageEvent } from './socketEvent/message';
import { channelEvent } from './socketEvent/channel';
import { typingEvent } from './socketEvent/typing';


const { findUser, updateOnlineStatus } = userServices;

export const ws = (server) => {
  const io = socketIO(server);
  io.use(socketioJwt.authorize({
    secret: config.secretKey,
    handshake: true,
  }));
  io.on('connection', async (socket) => {
    const user = await findUser(socket.decoded_token.id);
    if (user) {
      io.emit('updateOnlineStatus', { user, onlineStatus: true });
      updateOnlineStatus(user._id, true);
      socket.on('disconnect', () => {
        updateOnlineStatus(user._id, false);
        io.emit('updateOnlineStatus', { user, onlineStatus: false });
      });
      typingEvent(socket, user);
      messageEvent(socket, user._id, io);
      channelEvent(socket, io);
    }
  });
};
