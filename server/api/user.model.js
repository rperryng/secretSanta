var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebookUserId: {
    type: String,
    required: true,
    unique: true
  },
  matchUserId: {
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model('User', userSchema);
