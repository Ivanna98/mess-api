const { findUser, createMessage } = require('../services/userServices');

const messageEvent = (socket, id, io) => {
  socket.on('message', async ({ messValue, channelId }) => {
    const user = await findUser(id);
    const addedMess = await createMessage({ user, messValue, channelId });
    io.emit('addedMess', { addedMess });
    socket.broadcast.emit('addedMessChannel', { addedMess, channelId });
  });
};

module.exports = messageEvent;
