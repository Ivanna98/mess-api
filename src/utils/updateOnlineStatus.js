
const updateOnlineStatus = async (user, newStatus) => {
  await user.updateOne({
    onlineStatus: newStatus,
  }, { new: true });
};

module.exports = updateOnlineStatus;
