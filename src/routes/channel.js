const express = require('express');

const router = express.Router();
const passport = require('passport');
const GroupChannelCollection = require('../models/groupChannel');

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      title,
    } = req.body;

    const { id } = req.params;
    const updateChannel = await GroupChannelCollection.findByIdAndUpdate(id, {

      title,
    }, {
      new: true,
    });
    return res.json(updateChannel);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { id } = req.params;
    await GroupChannelCollection.findByIdAndDelete(id);
    return res.status(200).send('delete success');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const channels = await GroupChannelCollection.find();
    return res.json({ channels });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await GroupChannelCollection.findById(id);
    if (channel) {
      return res.json({ channel });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
