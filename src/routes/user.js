const express = require('express');

const router = express.Router();
const protect = require('../middleware/protect');
const { findUser, findAllUser } = require('../services/userServices');

router.get('/', protect, async (req, res) => {
  try {
    const users = await findAllUser();

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUser(id);
    if (user) {
      return res.status(200).json({ user });
    }
    return res.sendStatus(404);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
