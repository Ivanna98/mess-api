import mongoose from 'mongoose';

export interface IChannel {
  title: string;
}

const GroupChannelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IChannel & mongoose.Document>('GroupChannel', GroupChannelSchema);
