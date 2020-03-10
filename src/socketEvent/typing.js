
const typingEvent = (socket, user) => {
  socket.on('typing', (channelId) => {
    socket.broadcast.emit(`userTyping${channelId}`, user.name);
  });
};

module.exports = typingEvent;
