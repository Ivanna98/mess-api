
const updateOnlineStatus = async (user, newStatus) => {
  console.log('update');
  const {
    googleId, name, picture, email, typeStatus, onlineStatus,
  } = user;
  const updateUser = await user.updateOne({
    googleId,
    name,
    picture,
    email,
    typeStatus,
    onlineStatus: newStatus,
  }, { new: true });
};

module.exports = updateOnlineStatus;
