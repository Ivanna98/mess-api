const express = require('express');

const passport = require('passport');

const router = express.Router();
const GroupChannelCollection = require('../models/groupChannel');

router.post('/', async (req, res) => {
  try {
    const {
      title,
    } = req.body;
    const groupChannel = new GroupChannelCollection({
      title,
    });
    const savedChannel = await groupChannel.save();
    return res.json(savedChannel);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await GroupChannelCollection.findByIdAndDelete(id);
    return res.status(200).send('delete success');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const channels = await GroupChannelCollection.find();
    if (channels) {
      return res.json({ channels });
    }
    return res.json(null);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
