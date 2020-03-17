
import * as channelServices from '../services/channelServices';

const { createChannel } = channelServices;

export const channelEvent = (socket, io) => {
  socket.on('newChannel', async ({ title }) => {
    const savedChannel = await createChannel(title);
    io.emit('addedChannel', savedChannel);
  });
};
