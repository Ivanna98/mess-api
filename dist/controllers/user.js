"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userServices = tslib_1.__importStar(require("../services/userServices"));
const { findUser, findAllUser } = userServices;
exports.getAll = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield findAllUser();
        const transformUsers = users.map((user) => {
            const { _id, name, picture, onlineStatus, } = user;
            return ({
                id: _id,
                name,
                picture,
                onlineStatus,
            });
        });
        return res.status(200).json({ users: transformUsers });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.getOne = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield findUser(id);
        if (user) {
            const { _id, name, picture, onlineStatus, } = user;
            return res.status(200).json({
                user: {
                    id: _id,
                    name,
                    picture,
                    onlineStatus,
                },
            });
        }
        return res.sendStatus(404);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
