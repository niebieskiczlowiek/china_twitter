const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullName: {
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

userSchema.statics.create = async function (userData) {
  const user = new this(userData);
  await user.save();
  return user;
};

const User = mongoose.model('users', userSchema);

module.exports = User;
