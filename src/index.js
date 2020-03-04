const express = require('express');

const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const passport = require('passport');
const socketioJwt = require('socketio-jwt');
const config = require('./config');
const connectPassportOAuth = require('./middleware/passport');
const connectPassport = require('./middleware/passportJwt');
const auth = require('./routes/auth');
const findUser = require('./utils/findUser');
const messageEvent = require('./socketEvent/message');
const channelEvent = require('./socketEvent/channel');
const channelRoute = require('./routes/channel');
const messageRoute = require('./routes/message');
const userRoute = require('./routes/user');
const updateOnlineStatus = require('./utils/updateOnlineStatus');


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

io.use(socketioJwt.authorize({
  secret: config.secretKey,
  handshake: true,
}));
io.on('connection', async (socket) => {
  app.use('/user', userRoute);
  app.use('/channels', channelRoute);
  app.use('/message', messageRoute);
  const user = await findUser(socket.decoded_token.id);
  if (user) {
    console.log('hello', user.name);
    io.emit('updateOnlineStatus', { user, onlineStatus: true });
    updateOnlineStatus(user, true);
  } else console.log('user doesn`t exist');
  socket.on('disconnect', () => {
    console.log(`${user.name} disconnect`);
    updateOnlineStatus(user, false);
    io.emit('updateOnlineStatus', { user, onlineStatus: false });
  });
  socket.on('typing', () => {
    user.typeStatus = true;
    setTimeout(() => {
      user.typeStatus = false;
    }, 100);
  });
  messageEvent(socket, user, io);
  channelEvent(socket, io);
});

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


module.exports = app;
