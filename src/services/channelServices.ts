import GroupChannelCollection from '../models/groupChannel';

import * as messageServices from './messageServices';

const { deleteMessageFromChannel } = messageServices;

export const idUpdateChannel = async (id, title) => GroupChannelCollection.findByIdAndUpdate(id, {
  title,
}, {
  new: true,
});

export const createChannel = async (title) => GroupChannelCollection.create({
  title,
});

export const idDeleteChannel = async (id) => {
  await GroupChannelCollection.findByIdAndDelete(id);
  await deleteMessageFromChannel(id);
};

export const idGetChannel = async (id) => GroupChannelCollection.findById(id);
export const getAllChannels = async () => GroupChannelCollection.find();
