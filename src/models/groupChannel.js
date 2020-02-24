const mongoose = require('mongoose');

const GroupChannelSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('GroupChannel', GroupChannelSchema);
