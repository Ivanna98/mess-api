"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    groupChannel: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'GroupChannel',
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Message', messageSchema);
