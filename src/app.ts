import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';

import { config } from './config';
import { ws } from './ws';
import { connectPassport } from './middleware/passportJwt';

import { router as channelRoute } from './routes/channel';
import { router as messageRoute } from './routes/message';
import { router as userRoute } from './routes/user';
import { router as auth } from './routes/auth';
import connectPassportOAuth from './middleware/passport';


const app = express();
const server = http.createServer(app);


const DB_URL = config.db.url;

export const configApp = async () => {
  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());
  connectPassportOAuth();
  connectPassport(passport);

  app.use('/auth', auth);
  app.use('/user', userRoute);
  app.use('/channels', channelRoute);
  app.use('/message', messageRoute);
  ws(server);

  mongoose.connection.on('error', (err) => {
    console.log(err);
  });

  await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  return server;
};
