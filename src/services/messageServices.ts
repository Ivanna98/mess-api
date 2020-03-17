import MessageCollection from '../models/message';

export const deleteMessageFromChannel = async (idChannel) => {
  await MessageCollection.deleteMany({ groupChannel: idChannel });
};

export const getAllChannelMessage = async (channel) => MessageCollection
  .find({ groupChannel: channel })
  .populate('author', '_id name picture onlineStatus');

export const createMessage = async ({ user, messValue, channelId }) => MessageCollection.create({
  author: user,
  text: messValue,
  groupChannel: channelId,
});
