const UserCollection = require('../models/user');

const findUser = async (googleId) => {
  try {
    const userProfile = await UserCollection.findOne({ googleId });
    return (userProfile || null);
  } catch (e) {
    return null;
  }
};
