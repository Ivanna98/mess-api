const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  picture: {
    type: String,
    default: 'https://wisdomexperience.org/wp-content/uploads/2019/10/blank-profile-picture-973460_960_720.png',
  },
  name: {
    type: String,
    required: true,
  },
  googleId: {
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
