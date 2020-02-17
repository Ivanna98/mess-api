const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { googleSecret, googleId } = require('../config');
const findOrCreateUser = require('../utils/findOrCreateUser');


module.exports = () => passport.use(new GoogleStrategy({
  clientID: googleId,
  clientSecret: googleSecret,
  callbackURL: 'http://localhost:3002/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  console.log(accessToken);
  done(null, { user: findOrCreateUser(profile), accessToken });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
