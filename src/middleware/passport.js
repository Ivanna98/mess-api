const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { googleSecret, googleId } = require('../config');

module.exports = () => passport.use(new GoogleStrategy({
  clientID: googleId,
  clientSecret: googleSecret,
  callbackURL: 'http://localhost:3002/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
