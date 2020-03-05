
const typingEvent = (socket, user) => {
  socket.on('typing', () => {
    socket.broadcast.emit('userTyping', user.name);
  });
};

module.exports = typingEvent;
