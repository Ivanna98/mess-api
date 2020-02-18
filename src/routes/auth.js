const express = require('express');

const router = express.Router();
const passport = require('passport');
const generateToken = require('../utils/generateToken');

router.get('/google', passport.authenticate('google', {
  scope:
    ['profile'],
  response_type: 'code',
  // response_type: token id_token,
}));

router.get('/google/callback', passport.authenticate('google', {
  scope:
    ['profile'],
  response_type: 'code',
}), async (req, res) => {
  const token = await generateToken({ id: req.user._id });
  res.redirect(`http://localhost:3000/success?token=${token}`);
});


module.exports = router;
