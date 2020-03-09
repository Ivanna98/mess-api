const express = require('express');


const logger = require('morgan');
const cors = require('cors');

const passport = require('passport');
const connectPassportOAuth = require('./middleware/passport');
const connectPassport = require('./middleware/passportJwt');

const channelRoute = require('./routes/channel');
const messageRoute = require('./routes/message');
const userRoute = require('./routes/user');
const auth = require('./routes/auth');


const configApp = (app) => {
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
};

module.exports = configApp;
