const MessageCollection = require('../models/message');

const deleteMessageFromChannel = async (idChannel) => {
  MessageCollection.deleteMany({ groupChannel: idChannel });
};

const getAllChannelMessage = async (channel) => MessageCollection
  .find({ groupChannel: channel })
  .populate('author', '_id name picture onlineStatus');

const createMessage = async ({ user, messValue, channelId }) => MessageCollection.create({
  author: user,
  text: messValue,
  groupChannel: channelId,
});

module.exports = {
  deleteMessageFromChannel,
  getAllChannelMessage,
  createMessage,
};
