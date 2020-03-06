const express = require('express');

const passport = require('passport');

const router = express.Router();
const UserCollection = require('../models/user');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const users = await UserCollection.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollection.findById(id);
    if (user) {
      return res.status(200).json({ user });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
