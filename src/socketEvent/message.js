const MessageCollection = require('../models/message');

const messageEvent = (socket, user) => {
  socket.on('message', async (msg, channel) => {
    const newMsg = new MessageCollection({
      author: user,
      text: msg,
      groupChannel: channel,
    });
    const savedMsg = await newMsg.save();
    socket.emit('added message');
  });
};

module.exports = messageEvent;
