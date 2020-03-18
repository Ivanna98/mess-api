"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const messageServices = tslib_1.__importStar(require("../services/messageServices"));
const { getAllChannelMessage, } = messageServices;
exports.getAll = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channel } = req.query;
        if (!channel) {
            throw new Error('Bad request');
        }
        const messages = yield getAllChannelMessage(channel);
        const transformMessages = messages.map((message) => {
            const { _id, text, createdAt, author, groupChannel, } = message;
            return ({
                id: _id,
                text,
                author,
                createdAt,
                groupChannel,
            });
        });
        res.status(200).json({ messages: transformMessages });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
