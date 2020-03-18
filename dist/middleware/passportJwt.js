"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_jwt_1 = tslib_1.__importDefault(require("passport-jwt"));
const config_1 = require("../config");
const userServices = tslib_1.__importStar(require("../services/userServices"));
const { Strategy, ExtractJwt } = passport_jwt_1.default;
const { findUser } = userServices;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.config.secretKey,
};
exports.connectPassport = (passport) => {
    passport.use(new Strategy(options, (payload, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield findUser(payload.id);
            if (user) {
                return done(null, {
                    _id: user._id,
                    name: user.name,
                });
            }
            throw new Error('User doesn`t exist');
        }
        catch (err) {
            return done(err, false);
        }
    })));
};
