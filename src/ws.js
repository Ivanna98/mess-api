const socketioJwt = require('socketio-jwt');

const socketIO = require('socket.io');
const { findUser, updateOnlineStatus } = require('./services/userServices');
const messageEvent = require('./socketEvent/message');
const channelEvent = require('./socketEvent/channel');
const typingEvent = require('./socketEvent/typing');
const config = require('./config');

const ws = (server) => {
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

module.exports = ws;
