const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { googleSecret, googleId } = require('../config');

passport.use(new GoogleStrategy({
  clientID: googleId,
  clientSecret: googleSecret,
  callbackUrl: 'http://localhost:3002/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
