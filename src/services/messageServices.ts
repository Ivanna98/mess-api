import MessageCollection from '../models/message';

export const deleteMessageFromChannel = async (idChannel: string) => {
  await MessageCollection.deleteMany({ groupChannel: idChannel });
};

export const getAllChannelMessage = async (channel: string) => MessageCollection
  .find({ groupChannel: channel })
  .populate('author', '_id name picture onlineStatus');

interface Message {
  user: string;
  messValue: string;
  channelId: string;
}
export const createMessage = async (
  { user, messValue, channelId }: Message) => MessageCollection.create({
  author: user,
  text: messValue,
  groupChannel: channelId,
});
