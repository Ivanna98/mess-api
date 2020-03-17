import mongoose from 'mongoose';

export interface IMessage {
  groupChannel: string;
  author: string;
  text: string;
  createdAt: string;
  updatedAt: string;
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

export default mongoose.model<IMessage & mongoose.Document>('Message', messageSchema);
