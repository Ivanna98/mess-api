const { findUser } = require('../services/userServices');
const { createMessage } = require('../services/messageServices');

const messageEvent = (socket, id, io) => {
  socket.on('message', async ({ messValue, channelId }) => {
    const user = await findUser(id);
    const addedMess = await createMessage({ user, messValue, channelId });
    const {
      _id,
      text,
      createdAt,
      author,
      groupChannel,
    } = addedMess;
    io.emit(`addedMess${channelId}`, {
      addedMess: {
        id: _id,
        text,
        author,
        createdAt,
        groupChannel,
      },
    });
    socket.broadcast.emit('addedMessChannel', { addedMess, channelId });
  });
};

module.exports = messageEvent;
