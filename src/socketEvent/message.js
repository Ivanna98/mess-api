const MessageCollection = require('../models/message');

const messageEvent = (socket, user, io) => {
  socket.on('message', async ({ messValue, channelId }) => {
    const newMsg = new MessageCollection({
      author: user,
      text: messValue,
      groupChannel: channelId,
    });
    const addedMess = await newMsg.save();
    io.emit('addedMess', { channelId, addedMess });
  });
};

module.exports = messageEvent;
