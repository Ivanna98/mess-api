import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  picture: String,
  name: String,
  googleId: String,
  email: String,
  onlineStatus: Boolean,
}

const UserSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  onlineStatus: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
