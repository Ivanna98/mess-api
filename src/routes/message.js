const express = require('express');

const router = express.Router();
const passport = require('passport');
const { getAllChannelMessage } = require('../services/messageServices');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { channel } = req.query;
    if (!channel) {
      throw new Error('Bad request');
    }
    const messages = await getAllChannelMessage(channel);
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
