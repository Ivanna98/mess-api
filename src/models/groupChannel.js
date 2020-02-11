const mongoose = require('mongoose');

const GroupChannelSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  admins: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('GroupChannel', GroupChannelSchema);
