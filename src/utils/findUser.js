const UserCollection = require('../models/user');

const findUser = async (id) => {
  try {
    const userProfile = await UserCollection.findById(id);
    return (userProfile || null);
  } catch (e) {
    return null;
  }
};

module.exports = findUser;
