var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebookUserId: {
    type: Number,
    required: true,
    unique: true
  },
  matchedUserId: {
    type: Number,
    required: true
  }
});
