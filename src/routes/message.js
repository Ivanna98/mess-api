const express = require('express');

const router = express.Router();

const MessageCollection = require('../models/message');
const UserCollection = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const { channel } = req.query;
    const messages = await MessageCollection
      .find({ groupChannel: channel })
      .populate('author', '_id name picture onlineStatus');
    return res.json({ messages });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
