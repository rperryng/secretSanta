var express = require('express'),
  User = require('./user.model.js');

var api = module.exports = express();

api.get('/api/users/:facebookUserId', function (req, res) {
  var facebookUserId = req.param('facebookUserId');

  var match = {
    facebookUserId: facebookUserId
  };

  User.find(match, '-_id matchUserId', function (err, result) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.status(200).json(result[0]);
  });
});

api.post('/api/users', function (req, res) {
  console.log('got', req.body);

  var users = req.body.attending;
  var shuffled = shuffle(users);

  var documents = shuffled.map(function (user, index, array) {
    var nextUser = array[(index + 1) % array.length];
    return {
      facebookUserId: user.id,
      matchUserId: nextUser.id
    };
  });

  res.status(200).send(documents);
});

function shuffle(array) {
  var remainingIds = array.length;

  while (remainingIds) {
    var randomIndex = Math.floor(Math.random() * remainingIds--);

    var temp = array[remainingIds];
    array[remainingIds] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}
