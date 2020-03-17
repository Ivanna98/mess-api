import * as userServices from '../services/userServices';
import * as messageServices from '../services/messageServices';

const { findUser } = userServices;
const { createMessage } = messageServices;

export const messageEvent = (socket, id, io) => {
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
