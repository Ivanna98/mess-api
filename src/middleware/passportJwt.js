const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('../config');
const User = require('../models/user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
};

const connectPassport = (passport) => {
  passport.use(new Strategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, {
          _id: user._id,
          name: user.name,
        });
      }
      throw new Error('User doesn`t exist');
    } catch (err) {
      return done(err, false);
    }
  }));
};

module.exports = connectPassport;
