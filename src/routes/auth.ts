import express from 'express';
import passport from 'passport';
import { authCallback } from '../controllers/auth';

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

}), authCallback);
