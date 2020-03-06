const socketioJwt = require('socketio-jwt');

const socketIO = require('socket.io');
const { findUser } = require('./utils/userServices');
const messageEvent = require('./socketEvent/message');
const channelEvent = require('./socketEvent/channel');
const typingEvent = require('./socketEvent/typing');
const updateOnlineStatus = require('./utils/updateOnlineStatus');
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
      updateOnlineStatus(user, true);
    }
    socket.on('disconnect', () => {
      updateOnlineStatus(user, false);
      io.emit('updateOnlineStatus', { user, onlineStatus: false });
    });
    typingEvent(socket, user);
    messageEvent(socket, user._id, io);
    channelEvent(socket, io);
  });
};

module.exports = ws;
