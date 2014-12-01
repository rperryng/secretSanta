(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController($rootScope, $q, $state, facebook, facebookEventId, secretSantaFactory) {
    var vm = this;

    vm.user = undefined;
    vm.event = undefined;
    vm.match = undefined;
    vm.doneLoading = false;
    vm.setMatches = setMatches;

    activate();

    //////////

    function activate() {
      var _user;
      var _event;
      var _match;
      var _validUser = true;

      facebook.getMe()
        .then(function (user) {
          _user = user;
          return facebook.getEvent(facebookEventId);
        })
        .then(function (event) {
          _event = event;
          _validUser = event.attending.some(function (attendingUser) {
            return (attendingUser.id === _user.id);
          });

          if (!_validUser) {
            return $q.reject();
          }

          return secretSantaFactory.getMatch(_user.id);
        })
        .then(function (response) {
          _match = {
            id: response.data.matchUserId,
            canGetFacebook: false
          };
          return facebook.getUser(response.data.matchUserId);
        })
        .then(function (matchedUser) {
          _match = matchedUser;
          _match.canGetFacebook = true;
          return facebook.getUserPicture(matchedUser.id, 800);
        }, function () {
          // get match from attending list ...
          _event.attending.forEach(function (attendingUser) {
            if (attendingUser.id === _match.id) {
              _match = attendingUser;
              _match.canGetFacebook = false;
            }
          });
          return $q.reject();
        })
        .then(function (response) {
          _match.pictureUrl = response;
        })
        .finally(function () {
          if (!_validUser) {
            facebook.logout();
            $state.go('login');
            return;
          }

          console.log('user', _user);
          console.log('event', _event);
          console.log('match', _match);

          $rootScope.$broadcast('titleChanged', _event.name);

          vm.user = _user;
          vm.event = _event;
          vm.match = _match;
          vm.doneLoading = true;
        });
    }

    function setMatches() {
      secretSantaFactory.setMatches(vm.event)
        .then(function (response) {
          return secretSantaFactory.getMatch(vm.user.id);
        })
        .then(function (response) {
          console.log('got response', response);
        });
    }
  }
})();
