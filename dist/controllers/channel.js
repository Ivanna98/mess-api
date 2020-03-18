"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const channelServices = tslib_1.__importStar(require("../services/channelServices"));
const { idUpdateChannel, idDeleteChannel, getAllChannels, idGetChannel, } = channelServices;
exports.putOne = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const titleToUpdate = req.body.title;
        const { id } = req.params;
        const updateChannel = yield idUpdateChannel(id, titleToUpdate);
        if (!updateChannel) {
            throw new Error('Channel doesn`t exist');
        }
        const { title, _id, } = updateChannel;
        res.status(200).json({
            updateChannel: {
                id: _id,
                title,
            },
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteOne = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield idDeleteChannel(id);
        res.status(200).json({ message: 'delete success' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAll = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield getAllChannels();
        const transformChannels = channels.map((channel) => {
            const { _id, title, } = channel;
            return ({
                id: _id,
                title,
            });
        });
        res.status(200).json({ channels: transformChannels });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getOne = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const channel = yield idGetChannel(id);
        if (channel) {
            const { title, _id, } = channel;
            res.status(200).json({
                channel: {
                    title,
                    id: _id,
                },
            });
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
