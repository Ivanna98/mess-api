"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const socketio_jwt_1 = tslib_1.__importDefault(require("socketio-jwt"));
const socket_io_1 = tslib_1.__importDefault(require("socket.io"));
const userServices = tslib_1.__importStar(require("./services/userServices"));
const config_1 = require("./config");
const message_1 = require("./socketEvent/message");
const channel_1 = require("./socketEvent/channel");
const typing_1 = require("./socketEvent/typing");
const { findUser, updateOnlineStatus } = userServices;
exports.ws = (server) => {
    const io = socket_io_1.default(server);
    io.use(socketio_jwt_1.default.authorize({
        secret: config_1.config.secretKey,
        handshake: true,
        decodedPropertyName: 'token',
    }));
    io.on('connection', (socket) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = yield findUser(socket.decoded_token.id);
        if (user) {
            io.emit('updateOnlineStatus', { user, onlineStatus: true });
            updateOnlineStatus(user._id, true);
            socket.on('disconnect', () => {
                updateOnlineStatus(user._id, false);
                io.emit('updateOnlineStatus', { user, onlineStatus: false });
            });
            typing_1.typingEvent(socket, user);
            message_1.messageEvent(socket, user._id, io);
            channel_1.channelEvent(socket, io);
        }
    }));
};
