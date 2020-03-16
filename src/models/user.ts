import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  picture: string,
  name: string,
  googleId: string,
  email: string,
  onlineStatus: boolean,
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
