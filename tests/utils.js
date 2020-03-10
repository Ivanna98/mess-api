const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('../src/config');
const configApp = require('../src/app');
const UserCollection = require('../src/models/user');
const GroupChannelCollection = require('../src/models/groupChannel');
const MessageCollection = require('../src/models/message');
const mock = require('./mock');


const utils = {
  createMockUser: async (user) => {
   await  UserCollection.create(user);
   return user;
  },
  addChannel: async () => {
    const channel = await GroupChannelCollection.create(mock.channel);
    return channel;
  },
  addMessage: async (channelId) =>{
    await MessageCollection.create({
      author: mock.user1,
      text: mock.message.text,
      groupChannel: channelId,
    })
  },
  getMess: async (channelId) => {
    const messages = await MessageCollection.find({groupChannel: channelId});
    return messages;
  },
  initClientWs: (token) => new Promise((resolve) => {
    const wsClient = require('socket.io-client')('http://localhost:8080', {query: { token }});
    wsClient.on('connect', () => resolve(wsClient))
  }),
  enableDestroy: (server) => {
    const connections = {}
  
    server.on('connection', (conn) => {
      const key = conn.remoteAddress + ':' + conn.remotePort;
      connections[key] = conn;
      conn.on('close', function() {
        delete connections[key];
      });
    });
  
    server.destroy = (cb) => {
      server.close(cb);
      for (let key in connections)
        connections[key].destroy();
    };
  
    return server;
  }
  // createServer: async () => {
  //   try{
  //     configApp(app);
  //   await mongoose.connect(config.db.url, {useNewUrlParser: true})
  //   return app.listen(3002, () => console.log("here we go3"));
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
}

module.exports = utils;