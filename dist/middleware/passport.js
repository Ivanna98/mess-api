"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const passport_google_oauth2_1 = tslib_1.__importDefault(require("passport-google-oauth2"));
const config_1 = require("../config");
const userServices = tslib_1.__importStar(require("../services/userServices"));
const GoogleStrategy = passport_google_oauth2_1.default.Strategy;
const { updateOrCreateUser } = userServices;
exports.default = () => passport_1.default.use(new GoogleStrategy({
    clientID: config_1.config.googleId,
    clientSecret: config_1.config.googleSecret,
    callbackURL: `${config_1.config.cbUrl}/auth/google/callback`,
}, (__, _, profile, done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    done(null, yield updateOrCreateUser(profile));
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
