const express = require('express');

const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketJwt = require('socketio-jwt');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');
const connectPassportOAuth = require('./middleware/passport');
const auth = require('./routes/auth');

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

io.sockets
  .on('connection', socketJwt.authorize({
    secret: 'SECRET_KEY',
    timeout: 15000,
  })).on('authenticated', (socket) => {
    console.log(`hello! ${socket.decoded_token.name}`);
  });

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
  })
  .catch((error) => console.log(error.message));

mongoose.connection.on('error', (err) => {
  console.log(err);
});

module.exports = app;
