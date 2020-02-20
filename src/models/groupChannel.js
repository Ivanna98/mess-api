const mongoose = require('mongoose');

const GroupChannelSchema = mongoose.Schema({
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
