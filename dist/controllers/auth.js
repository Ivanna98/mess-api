"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const generateToken_1 = require("../utils/generateToken");
const config_1 = require("../config");
exports.authCallback = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const token = yield generateToken_1.generateToken({ id: req.user._id });
        res.redirect(`${config_1.config.feUrl}/success?token=${token}`);
    }
    else
        res.sendStatus(401);
});
