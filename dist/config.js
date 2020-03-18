"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const custom_env_1 = tslib_1.__importDefault(require("custom-env"));
custom_env_1.default.env(true);
exports.config = {
    db: {
        url: process.env.DB_URL || '',
    },
    port: process.env.PORT || 3002,
    feUrl: process.env.FE_URL || '',
    cbUrl: process.env.CB_URL || '',
    googleSecret: process.env.GOOGLE_SECRET || '',
    googleId: process.env.GOOGLE_ID || '',
    secretKey: process.env.SECRET || '',
    jwtExpiration: 5184000,
};
