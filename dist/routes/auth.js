"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const auth_1 = require("../controllers/auth");
exports.router = express_1.default.Router();
exports.router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile'],
}));
exports.router.get('/google/callback', passport_1.default.authenticate('google', {
    scope: ['profile'],
}), auth_1.authCallback);
