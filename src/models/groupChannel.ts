import * as mongoose from 'mongoose';

export interface IChannel extends mongoose.Document {
  title: string;
}

const GroupChannelSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IChannel>('GroupChannel', GroupChannelSchema);
