"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const message_1 = tslib_1.__importDefault(require("../models/message"));
exports.deleteMessageFromChannel = (idChannel) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield message_1.default.deleteMany({ groupChannel: idChannel });
});
exports.getAllChannelMessage = (channel) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return message_1.default
        .find({ groupChannel: channel })
        .populate('author', '_id name picture onlineStatus');
});
exports.createMessage = ({ user, messValue, channelId }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return message_1.default.create({
        author: user,
        text: messValue,
        groupChannel: channelId,
    });
});
