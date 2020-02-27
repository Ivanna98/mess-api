const express = require('express');

const router = express.Router();
const UserCollection = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const users = UserCollection.find();

    return res.json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollection.findById(id);
    if (user) {
      return res.json({ user });
    }
    throw Error('User doesn`t exist');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
