"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userServices = tslib_1.__importStar(require("../services/userServices"));
const messageServices = tslib_1.__importStar(require("../services/messageServices"));
const { findUser } = userServices;
const { createMessage } = messageServices;
exports.messageEvent = (socket, id, io) => {
    socket.on('message', ({ messValue, channelId }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = yield findUser(id);
        if (user) {
            const addedMess = yield createMessage({ user: user._id, messValue, channelId });
            const { _id, text, createdAt, author, groupChannel, } = addedMess;
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
    }));
};
