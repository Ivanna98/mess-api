const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
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
    require: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);
