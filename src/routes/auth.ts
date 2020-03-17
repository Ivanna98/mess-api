import express from 'express';
import passport from 'passport';

import { config } from '../config';
import { generateToken } from '../utils/generateToken';

export const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope:
    ['profile'],
  response_type: 'code',
}));

router.get('/google/callback', passport.authenticate('google', {
  scope:
    ['profile'],
  response_type: 'code',

// TODO define interface later
}), async (req: any, res) => {
  console.log(req);
  const token = await generateToken({ id: req.user._id });
  res.redirect(`${config.feUrl}/success?token=${token}`);
});
