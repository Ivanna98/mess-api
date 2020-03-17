import passportJwt from 'passport-jwt';
import { config } from '../config';
import * as userServices from '../services/userServices';

const { Strategy, ExtractJwt } = passportJwt;

const { findUser } = userServices;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
};

export const connectPassport = (passport) => {
  passport.use(new Strategy(options, async (payload, done) => {
    try {
      const user = await findUser(payload.id);
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
