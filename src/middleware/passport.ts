import passport from 'passport';
import gOauth2 from 'passport-google-oauth2';
import { config } from '../config';
import * as userServices from '../services/userServices';

const GoogleStrategy = gOauth2.Strategy;
const { updateOrCreateUser } = userServices;


export default () => passport.use(new GoogleStrategy({
  clientID: config.googleId,
  clientSecret: config.googleSecret,
  callbackURL: `${config.cbUrl}/auth/google/callback`,
},
async (accessToken, refreshToken, profile, done) => {
  done(null, await updateOrCreateUser(profile));
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
