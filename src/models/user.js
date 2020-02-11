const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: 'https://wisdomexperience.org/wp-content/uploads/2019/10/blank-profile-picture-973460_960_720.png',
  },
  number: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 40,
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
