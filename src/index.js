const express = require('express');

const app = express();
const server = require('http').createServer(app);

const mongoose = require('mongoose');
const ws = require('./ws');
const configApp = require('./app');
const config = require('./config');


const PORT = process.env.PORT || 3002;
const DB_URL = config.db.url;

configApp(app);
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
