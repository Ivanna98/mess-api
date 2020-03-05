const MessageCollection = require('../models/message');
const { findUser } = require('../utils/userServices');

const messageEvent = (socket, id, io) => {
  socket.on('message', async ({ messValue, channelId }) => {
    const user = await findUser(id);
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
