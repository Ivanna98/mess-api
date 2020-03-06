const express = require('express');

const router = express.Router();
const passport = require('passport');
const MessageCollection = require('../models/message');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { channel } = req.query;
    const messages = await MessageCollection
      .find({ groupChannel: channel })
      .populate('author', '_id name picture onlineStatus');
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
