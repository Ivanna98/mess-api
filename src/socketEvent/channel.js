const GroupChannelCollection = require('../models/groupChannel');

const channelEvent = (socket, io) => {
  socket.on('newChannel', async ({ title }) => {
    const savedChannel = await GroupChannelCollection.create({
      title,
    });
    io.emit('addedChannel', savedChannel);
  });
};

module.exports = channelEvent;
