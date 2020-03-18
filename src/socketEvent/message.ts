import * as userServices from '../services/userServices';
import * as messageServices from '../services/messageServices';

const { findUser } = userServices;
const { createMessage } = messageServices;

export const messageEvent = (socket: SocketIO.Socket, id: string, io: SocketIO.Server) => {
  socket.on('message', async ({ messValue, channelId }) => {
    const user = await findUser(id);
    if (user) {
      const addedMess = await createMessage({ user: user._id, messValue, channelId });
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
    }
  });
};
