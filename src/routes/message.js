const express = require('express');

const router = express.Router();

const MessageCollection = require('../models/message');
const UserCollection = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const { channel } = req.query;
    const messages = await MessageCollection
      .find({ groupChannel: channel })
      .populate({
        path: 'author',
        model: UserCollection,
        select: {
          _id: 1, name: 1, picture: 1, onlineStatus: 1,
        },
      });
    return res.json({ messages });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
