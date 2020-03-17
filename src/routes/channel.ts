import express from 'express';
import { protect } from '../middleware/protect';
import * as channelServices from '../services/channelServices';

const {
  idUpdateChannel,
  idDeleteChannel,
  getAllChannels,
  idGetChannel,
} = channelServices;

export const router = express.Router();


router.put('/:id', protect, async (req, res) => {
  try {
    const titleToUpdate = req.body.title;

    const { id } = req.params;
    const updateChannel = await idUpdateChannel(id, titleToUpdate);
    const {
      title,
      _id,
    } = updateChannel;
    if (!updateChannel) {
      throw new Error('Channel doesn`t exist');
    }
    res.status(200).json({
      updateChannel: {
        id: _id,
        title,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    await idDeleteChannel(id);
    res.status(200).json('delete success');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', protect, async (req, res) => {
  try {
    const channels = await getAllChannels();
    channels.map((channel) => {
      const {
        _id,
        title,
      } = channel;
      return ({
        channel: {
          id: _id,
          title,
        },
      });
    });
    res.status(200).json({ channels });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await idGetChannel(id);
    if (channel) {
      const {
        title,
        _id,
      } = channel;
      return res.status(200).json({
        channel: {
          title,
          id: _id,
        },
      });
    }
    res.sendStatus(404);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
