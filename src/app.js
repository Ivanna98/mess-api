const express = require('express');

const app = express();
const server = require('http').createServer(app);

const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');
const ws = require('./ws');
const connectPassportOAuth = require('./middleware/passport');
const connectPassport = require('./middleware/passportJwt');

const channelRoute = require('./routes/channel');
const messageRoute = require('./routes/message');
const userRoute = require('./routes/user');
const auth = require('./routes/auth');

const DB_URL = config.db.url;

const configApp = async () => {
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

module.exports = configApp;
