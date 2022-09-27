const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Ваше имя',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: 6,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
