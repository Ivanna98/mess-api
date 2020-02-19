const express = require('express');

const router = express.Router;

const MessageCollection = require('../models/message');

router.get('/', async (req, res) => {
  try {
    const selector = {};
    const { channel } = req.query;
    selector.groupChannel = channel;
    const messages = await MessageCollection.find({ selector });
    return res.json({ messages });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});
