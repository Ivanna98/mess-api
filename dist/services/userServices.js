"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_1 = tslib_1.__importDefault(require("../models/user"));
exports.updateOrCreateUser = (profile) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { id, displayName, picture } = profile;
    const user = yield user_1.default.findOne({ googleId: id });
    if (user) {
        user.name = displayName;
        user.picture = picture;
        const updateUser = yield user.save();
        return updateUser;
    }
    const newUser = yield user_1.default.create({
        googleId: id,
        name: displayName,
        picture,
        email: id,
    });
    return newUser;
});
exports.findUser = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return user_1.default.findById(id); });
exports.findAllUser = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return user_1.default.find(); });
exports.updateOnlineStatus = (id, newStatus) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return user_1.default
        .findByIdAndUpdate(id, { onlineStatus: newStatus }, { new: true });
});
