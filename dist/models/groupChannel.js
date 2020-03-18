"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const GroupChannelSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model('GroupChannel', GroupChannelSchema);
