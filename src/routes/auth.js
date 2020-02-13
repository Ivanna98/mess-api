const express = require('express');

const router = express.Router();
const passport = require('passport');
const UserCollection = require('../models/user');

router.get('/google', passport.authenticate('google', {
  scope:
    ['profile'],
}));

router.get('/google/callback', passport.authenticate('google', {
  scope:
    ['profile'],
  failureRedirect: '/auth/google/failure',
}), (req, res) => {
  const token = req.user.accessToken;
  res.redirect(`http://localhost:3000/success?token=${token}`);
});


module.exports = router;
