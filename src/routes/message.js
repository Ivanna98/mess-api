const express = require('express');

const router = express.Router();
const protect = require('../middleware/protect');
const { getAllChannelMessage } = require('../services/messageServices');

router.get('/', protect, async (req, res) => {
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
