import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  groupChannel: String;
  author: String;
  text: String;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema({
  groupChannel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupChannel',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IMessage>('Message', messageSchema);
