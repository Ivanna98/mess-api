"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const groupChannel_1 = tslib_1.__importDefault(require("../models/groupChannel"));
const messageServices = tslib_1.__importStar(require("./messageServices"));
const { deleteMessageFromChannel } = messageServices;
exports.idUpdateChannel = (id, title) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return groupChannel_1.default.findByIdAndUpdate(id, {
        title,
    }, {
        new: true,
    });
});
exports.createChannel = (title) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return groupChannel_1.default.create({
        title,
    });
});
exports.idDeleteChannel = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield groupChannel_1.default.findByIdAndDelete(id);
    yield deleteMessageFromChannel(id);
});
exports.idGetChannel = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return groupChannel_1.default.findById(id); });
exports.getAllChannels = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return groupChannel_1.default.find(); });
