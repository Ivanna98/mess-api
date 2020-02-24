const GroupChannelCollection = require('../models/groupChannel');

const channelEvent = (socket, io) => {
  socket.on('newChannel', async ({ title }) => {
    const groupChannel = new GroupChannelCollection({
      title,
    });
    const savedChannel = await groupChannel.save();
    io.emit('addedChannel', savedChannel);
  });
};

module.exports = channelEvent;
