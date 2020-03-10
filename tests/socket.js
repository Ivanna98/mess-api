const ws = require('../src/ws');
const config = require('../src/config');
const http = require('http');
const mongoose = require('mongoose');
const UserCollection = require('../src/models/user');
const GroupChannelCollection = require('../src/models/groupChannel');
const MessageCollection = require('../src/models/message');
const { addChannel, createMockUser, enableDestroy, initClientWs } = require('./utils');
const { user1, message, channel } = require('./mock');
const generateToken = require('../src/utils/generateToken');

const { assert } = require('chai');

describe('Web socket tests', () => {
  let server;
  let token;

  before((done) => {
    server = enableDestroy(http.createServer());
    ws(server);
    mongoose.connect(config.db.url, { useNewUrlParser: true })
      .then(() => {
        server.listen(8080, () => {
          done()
        });
      })
  });

  beforeEach(async () => {
    await UserCollection.deleteMany({});
    await GroupChannelCollection.deleteMany({});
    await MessageCollection.deleteMany({});
    await createMockUser(user1);
    token = await generateToken({ id: user1._id });
  })

  after((done) => {
    if (server) {
      server.destroy(() => {
        done()
      });
    }
  });

  describe('Message socket', () => {
    it('Should return correct message', async () => {
      const wsClient = await initClientWs(token);
      const { _id } = await addChannel();
      const { text } = message;
      await new Promise((resolve) => {
        wsClient.emit('message', { messValue: text, channelId: _id });
        wsClient.on(`addedMess${_id}`, ({ addedMess }) => {
          assert.equal(addedMess.text, text);
          resolve();
        });
      })
    });

    it('Should return message in another client', async () => {
      const wsClient1 = await initClientWs(token);
      const wsClient2 = await initClientWs(token);
      const { _id } = await addChannel();
      const { text } = message;
      await new Promise((resolve) => {
        wsClient1.emit('message', { messValue: text, channelId: _id });
        wsClient2.on(`addedMess${_id}`, ({ addedMess }) => {
          assert.equal(addedMess.text, text);
          resolve();
        });
      })
    });

    it('Should return correct data', async () => {
      const wsClient1 = await initClientWs(token);
      const wsClient2 = await initClientWs(token);
      const { _id } = await addChannel();
      const { text } = message;
      await new Promise((resolve) => {
        wsClient1.emit('message', { messValue: text, channelId: _id });
        wsClient2.on('addedMessChannel', ({ addedMess, channelId }) => {
          assert.equal(addedMess.text, text);
          assert.equal(channelId, _id);
          resolve();
        });

      });
    });
  });

  describe('Typing socket', () => {
    it('Should return typing', async () => {
      const wsClient1 = await initClientWs(token);
      const wsClient2 = await initClientWs(token);
      const { _id } = await addChannel();
      await new Promise((resolve) => {
        wsClient1.emit('typing',  _id );
        wsClient2.on(`userTyping${_id}`, () => {
          resolve();
        });
      });
    });
  });

  describe('Channel socket', () => {
    it('Should return correct channel', async () => {
      const wsClient1 = await initClientWs(token);
      const wsClient2 = await initClientWs(token);
      await new Promise((resolve) => {
        wsClient1.emit('newChannel',  {title: channel.title} );
        wsClient2.on(`addedChannel`, (savedChannel) => {
          assert.equal(channel.title, savedChannel.title);
          resolve();
        });
      });
    });
  });
});