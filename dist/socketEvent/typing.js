"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typingEvent = (socket, user) => {
    socket.on('typing', (channelId) => {
        socket.broadcast.emit(`userTyping${channelId}`, user.name);
    });
};
