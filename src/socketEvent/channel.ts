
import * as channelServices from '../services/channelServices';

const { createChannel } = channelServices;

interface socketData {
  title: string;
}

export const channelEvent = (socket: SocketIO.Socket, io: SocketIO.Server) => {
  socket.on('newChannel', async ({ title }: socketData) => {
    const savedChannel = await createChannel(title);
    io.emit('addedChannel', savedChannel);
  });
};
