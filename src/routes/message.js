const express = require('express');

const router = express.Router();

const MessageCollection = require('../models/message');

router.get('/', async (req, res) => {
  try {
    const { channel } = req.query;
    const messages = await MessageCollection.find({ groupChannel: channel });
    return res.json({ messages });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});

module.exports = router;
