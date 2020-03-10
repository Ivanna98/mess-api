const GroupChannelCollection = require('../models/groupChannel');
const { deleteMessageFromChannel } = require('./messageServices');

const idUpdateChannel = async (id, title) => GroupChannelCollection.findByIdAndUpdate(id, {
  title,
}, {
  new: true,
});

const createChannel = async (title) => GroupChannelCollection.create({
  title,
});

const idDeleteChannel = async (id) => {
  await GroupChannelCollection.findByIdAndDelete(id);
  await deleteMessageFromChannel(id);
};

const idGetChannel = async (id) => GroupChannelCollection.findById(id);
const getAllChannels = async () => GroupChannelCollection.find();

module.exports = {
  idUpdateChannel,
  idDeleteChannel,
  getAllChannels,
  idGetChannel,
  createChannel,
};
