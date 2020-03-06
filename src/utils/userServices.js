const UserCollection = require('../models/user');

const updateOrCreateUser = async (profile) => {
  const { id, displayName, picture } = profile;
  const user = await UserCollection.findOne({ googleId: id });
  if (user) {
    user.name = displayName;
    user.picture = picture;
    const updateUser = await user.save();
    return (updateUser);
  }
  const newUser = await UserCollection.create({
    googleId: id,
    name: displayName,
    picture,
    email: id,
  });
  return (newUser);
};
const findUser = async (id) => {
  const user = await UserCollection.findById(id);
  return (user);
};

module.exports.updateOrCreateUser = updateOrCreateUser;
module.exports.findUser = findUser;
