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
const auth = require('./routes/auth');
const findUser = require('./utils/findUser');

const PORT = process.env.PORT || 3002;
const DB_URL = config.db.url;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
connectPassportOAuth();

app.get('/ready', (req, res) => {
  res.send('I`m alive');
});
app.use('/auth', auth);
// app.use('/channel', channel);

io.use(socketioJwt.authorize({
  secret: config.secretKey,
  handshake: true,
}));
io.on('connection', async (socket) => {
  const user = await findUser(socket.decoded_token.id);
  if (user) {
    console.log('hello', user.name);
  } else console.log('user doesn`t exist');
});

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT} `);
    });
  })
  .catch((error) => console.log(error.message));

mongoose.connection.on('error', (err) => {
  console.log(err);
});

module.exports = app;
