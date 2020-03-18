import mongoose from 'mongoose';

export interface IUser {
  _id: string;
  picture: string;
  name: string;
  googleId: string;
  email: string;
  onlineStatus: boolean;
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
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  onlineStatus: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IUser & mongoose.Document>('User', UserSchema);
