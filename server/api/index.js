var express = require('express'),
  User = require('./user.model.js');

var api = module.exports = express();

api.get('/api/users/:facebookUserId', function (req, res) {
  var facebookUserId = req.param('facebookUserId');

  var match = {
    facebookUserId: facebookUserId
  };

  User.find(match, '-_id facebookUserId matchUserId', function (err, result) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.status(200).json(result);
  });
});
