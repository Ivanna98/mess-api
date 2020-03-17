import UserCollection from '../models/user';


export const updateOrCreateUser = async (profile) => {
  const { id, displayName, picture } = profile;
  const user = await UserCollection.findOne({ googleId: id });
  if (user) {
    user.name = displayName;
    user.picture = picture;
    const updateUser = await user.save();
    return updateUser;
  }
  const newUser = await UserCollection.create({
    googleId: id,
    name: displayName,
    picture,
    email: id,
  });
  return newUser;
};
export const findUser = async (id) => UserCollection.findById(id);

export const findAllUser = async () => UserCollection.find();

export const updateOnlineStatus = async (id, newStatus) => UserCollection
  .findByIdAndUpdate(id, { onlineStatus: newStatus }, { new: true });
