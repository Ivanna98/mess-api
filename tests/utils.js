
const UserCollection = require('../src/models/user');
const GroupChannelCollection = require('../src/models/groupChannel');
const MessageCollection = require('../src/models/message');
const mock = require('./mock');


const utils = {
  createMockUser: async (user) => UserCollection
    .create(user),
  addChannel: async () => GroupChannelCollection
    .create(mock.channel),

  addMessage: async (channelId) => {
    await MessageCollection.create({
      author: mock.user1,
      text: mock.message.text,
      groupChannel: channelId,
    })
  },
  getMess: async (channelId) => MessageCollection
    .find({ groupChannel: channelId }),

  initClientWs: (token) => new Promise((resolve) => {
    const wsClient = require('socket.io-client')('http://localhost:8080', { query: { token } });
    wsClient.on('connect', () => resolve(wsClient))
  }),
  enableDestroy: (server) => {
    const connections = {}

    server.on('connection', (conn) => {
      const key = conn.remoteAddress + ':' + conn.remotePort;
      connections[key] = conn;
      conn.on('close', function () {
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
}

module.exports = utils;