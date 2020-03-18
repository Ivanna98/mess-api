"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const protect_1 = require("../middleware/protect");
const user_1 = require("../controllers/user");
exports.router = express_1.default.Router();
exports.router.get('/', protect_1.protect, user_1.getAll);
exports.router.get('/:id', protect_1.protect, user_1.getOne);
