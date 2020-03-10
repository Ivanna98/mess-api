const express = require('express');

const router = express.Router();
const passport = require('passport');

const {
  idUpdateChannel, idDeleteChannel, getAllChannels, idGetChannel,
} = require('../services/channelServices');

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      title,
    } = req.body;

    const { id } = req.params;
    const updateChannel = await idUpdateChannel(id, title);
    if (!updateChannel) {
      throw new Error('Channel doesn`t exist');
    }
    res.status(200).json({ updateChannel });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { id } = req.params;
    await idDeleteChannel(id);
    res.status(200).json('delete success');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const channels = await getAllChannels();
    res.status(200).json({ channels });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await idGetChannel(id);
    if (channel) {
      return res.status(200).json({ channel });
    }
    res.sendStatus(404);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
