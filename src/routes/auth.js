const express = require('express');

const router = express.Router();
const passport = require('passport');
const UserCollection = require('../models/user');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', { scope: ['profile'] }),
  async (req, res) => {
    try {
      const { picture, displayName, id } = req.profile;
      // const token = req.accessToken;
      const user = await UserCollection.findOne({ googleId: id });
      if (user) {
        const updateUser = await UserCollection.findOneAndUpdate({ googleId: id }, {
          picture,
          displayName,
          googleId: id,
        });
        return res.json({
          user: updateUser,
          // token,
        });
      }
      const newUser = await new UserCollection({
        picture,
        displayName,
        googleId: id,
      }).save();
      return res.json({
        user: newUser,
        // token,
      });
    } catch (err) {
      return res.status('400').send({ error: err });
    }
  });

module.exports = router;
