import express, { Request, Response } from 'express';
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

}), async (req: Request, res: Response) => {
  console.log(req);
  const token = await generateToken({ id: req.user._id });
  res.redirect(`${config.feUrl}/success?token=${token}`);
});
