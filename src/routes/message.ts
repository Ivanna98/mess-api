import express from 'express';
import { protect } from '../middleware/protect';
import * as messageServices from '../services/messageServices';

const {
  getAllChannelMessage,
} = messageServices;

export const router = express.Router();


router.get('/', protect, async (req, res) => {
  try {
    const { channel } = req.query;
    if (!channel) {
      throw new Error('Bad request');
    }
    const messages = await getAllChannelMessage(channel);
    messages.map((message) => {
      const {
        _id,
        text,
        createdAt,
        author,
        groupChannel,
      } = message;
      return ({
        message: {
          id: _id,
          text,
          author,
          createdAt,
          groupChannel,
        },
      });
    });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
