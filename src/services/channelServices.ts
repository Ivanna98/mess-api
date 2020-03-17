import GroupChannelCollection from '../models/groupChannel';

import * as messageServices from './messageServices';

const { deleteMessageFromChannel } = messageServices;

export const idUpdateChannel = async (
  id: string, title: string) => GroupChannelCollection.findByIdAndUpdate(id, {
  title,
}, {
  new: true,
});

export const createChannel = async (title: string) => GroupChannelCollection.create({
  title,
});

export const idDeleteChannel = async (id: string) => {
  await GroupChannelCollection.findByIdAndDelete(id);
  await deleteMessageFromChannel(id);
};

export const idGetChannel = async (id: string) => GroupChannelCollection.findById(id);
export const getAllChannels = async () => GroupChannelCollection.find();
