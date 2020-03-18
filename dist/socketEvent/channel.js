"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const channelServices = tslib_1.__importStar(require("../services/channelServices"));
const { createChannel } = channelServices;
exports.channelEvent = (socket, io) => {
    socket.on('newChannel', ({ title }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const savedChannel = yield createChannel(title);
        io.emit('addedChannel', savedChannel);
    }));
};
