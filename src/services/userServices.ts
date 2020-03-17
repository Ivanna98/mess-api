import UserCollection from '../models/user';

interface Profile {
  id: string;
  displayName: string;
  picture: string;
}

interface User {
  _id: string;
  googleId: string;
  name: string;
  picture: string;
  email: string;
  onlineStatus: boolean;
}

export const updateOrCreateUser = async (profile: Profile): Promise<User> => {
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
export const findUser = async (id: string) => UserCollection.findById(id);

export const findAllUser = async () => UserCollection.find();

export const updateOnlineStatus = async (id: string, newStatus: boolean) => UserCollection
  .findByIdAndUpdate(id, { onlineStatus: newStatus }, { new: true });
