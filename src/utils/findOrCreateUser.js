const UserCollection = require('../models/user');

const findOrCreateUser = async (profile) => {
  const { id, displayName, picture } = profile;
  const user = await UserCollection.findOne({ googleId: id });
  if (user) {
    const updateUser = await UserCollection.findOneAndUpdate({ googleId: id }, {
      googleId: id,
      name: displayName,
      picture,
      email: id,
    }, { new: true });
    return (updateUser);
  }
  const newUser = new UserCollection({
    googleId: id,
    name: displayName,
    picture,
    email: id,
  });
  await newUser.save();
  return (newUser);
};

module.exports = findOrCreateUser;
