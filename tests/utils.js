const UserCollection = require('../src/models/user');
const GroupChannelCollection = require('../src/models/groupChannel');
const MessageCollection = require('../src/models/message');
const mock = require('./mock');

const utils = {
  createMockUser: async () => {
   await  UserCollection.create(mock.user1);
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
  }
}

module.exports = utils;