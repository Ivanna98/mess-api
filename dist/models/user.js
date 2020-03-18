"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    picture: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    onlineStatus: {
        type: Boolean,
        default: false,
    },
});
exports.default = mongoose_1.default.model('User', UserSchema);
