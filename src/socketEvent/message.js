const { findUser } = require('../services/userServices');
const { createMessage } = require('../services/messageServices');

const messageEvent = (socket, id, io) => {
  socket.on('message', async ({ messValue, channelId }) => {
    const user = await findUser(id);
    const addedMess = await createMessage({ user, messValue, channelId });
    io.emit(`addedMess${channelId}`, { addedMess });
    socket.broadcast.emit('addedMessChannel', { addedMess, channelId });
  });
};

module.exports = messageEvent;
