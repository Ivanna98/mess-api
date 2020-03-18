"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const protect_1 = require("../middleware/protect");
const message_1 = require("../controllers/message");
exports.router = express_1.default.Router();
exports.router.get('/', protect_1.protect, message_1.getAll);
