const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  picture: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  typeStatus: {
    type: Boolean,
    default: false,
  },
  onlineStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
