var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebookUserId: {
    type: Number,
    required: true,
    unique: true
  },
  matchUserId: {
    type: Number,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model('User', userSchema);
