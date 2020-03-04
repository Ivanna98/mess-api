const MessageCollection = require('../models/message');

const messageEvent = (socket, user, io) => {
  socket.on('message', async ({ messValue, channelId }) => {
    const addedMess = await MessageCollection.create({
      author: user,
      text: messValue,
      groupChannel: channelId,
    });
    io.emit('addedMess', { addedMess });
    socket.broadcast.emit('addedMessChannel', { addedMess, channelId });
  });
};

module.exports = messageEvent;
