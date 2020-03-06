const express = require('express');

const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const server = require('http').createServer(app);
const cors = require('cors');
const passport = require('passport');
const config = require('./config');
const connectPassportOAuth = require('./middleware/passport');
const connectPassport = require('./middleware/passportJwt');
const auth = require('./routes/auth');
const ws = require('./ws');

const channelRoute = require('./routes/channel');
const messageRoute = require('./routes/message');
const userRoute = require('./routes/user');

const PORT = process.env.PORT || 3002;
const DB_URL = config.db.url;

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

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT} `);
    });
  })
  .catch((error) => console.log(error.message));


module.exports = server;
