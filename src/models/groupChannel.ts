import mongoose from 'mongoose';

export interface IChannel extends mongoose.Document {
  title: String;
}

const GroupChannelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IChannel>('GroupChannel', GroupChannelSchema);
