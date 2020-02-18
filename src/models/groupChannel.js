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
  title: {
    type: String,
    require: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('GroupChannel', GroupChannelSchema);
