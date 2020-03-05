const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { googleSecret, googleId } = require('../config');
const { updateOrCreateUser } = require('../utils/userServices');
const config = require('../config');


module.exports = () => passport.use(new GoogleStrategy({
  clientID: googleId,
  clientSecret: googleSecret,
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
