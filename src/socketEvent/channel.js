
const { createChannel } = require('../services/channelServices');

const channelEvent = (socket, io) => {
  socket.on('newChannel', async ({ title }) => {
    console.log('channel');
    const savedChannel = await createChannel(title);
    io.emit('addedChannel', savedChannel);
  });
};

module.exports = channelEvent;
