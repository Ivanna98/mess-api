const UserCollection = require('../models/user');

const findOrCreateUser = async (profile) => {
  const { id, displayName, photos } = profile;
  const user = await UserCollection.findOne({ googleId: id });
  if (user) {
    const updateUser = await UserCollection.findOneAndUpdate({ googleId: id }, {
      googleId: id,
      name: displayName,
      picture: photos.value,
    }, { new: true });
    return (updateUser);
  }
  const newUser = new UserCollection({
    googleId: id,
    name: displayName,
    picture: photos.value,
  });
  await newUser.save();
  return (newUser);
};

module.exports = findOrCreateUser;
