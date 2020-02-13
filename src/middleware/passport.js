const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { googleSecret, googleId } = require('../config');
const UserCollection = require('../models/user');

module.exports = () => passport.use(new GoogleStrategy({
  clientID: googleId,
  clientSecret: googleSecret,
  callbackURL: 'http://localhost:3002/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  const { id, displayName, photos } = profile;
  const user = await UserCollection.findOne({ googleId: id });
  if (user) {
    const updateUser = await UserCollection.findOneAndUpdate({ googleId: id }, {
      googleId: id,
      name: displayName,
      picture: photos.value,
    }, { new: true });
    done(null, { updateUser, accessToken });
  } else {
    const newUser = new UserCollection({
      googleId: id,
      name: displayName,
      picture: photos.value,
    });
    await newUser.save();
    done(null, { newUser, accessToken });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
