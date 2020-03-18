"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const { secretKey, jwtExpiration } = config_1.config;
exports.generateToken = (payload) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: jwtExpiration }, (err, token) => {
        if (err) {
            reject(Error('Error token'));
        }
        resolve(token);
    });
});
