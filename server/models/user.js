const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nick: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
