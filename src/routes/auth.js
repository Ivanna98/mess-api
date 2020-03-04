const express = require('express');

const router = express.Router();
const passport = require('passport');
const generateToken = require('../utils/generateToken');
const config = require('../config');

router.get('/google', passport.authenticate('google', {
  scope:
    ['profile'],
  response_type: 'code',
}));

router.get('/google/callback', passport.authenticate('google', {
  scope:
    ['profile'],
  response_type: 'code',
}), async (req, res) => {
  const token = await generateToken({ id: req.user._id });
  res.redirect(`${config.feUrl}/success?token=${token}`);
});


module.exports = router;
