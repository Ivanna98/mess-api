
const channelEvent = (socket) => {
  socket.on('newChannel', () => {
    socket.emit('addedChannel');
  });
};

module.exports = channelEvent;
