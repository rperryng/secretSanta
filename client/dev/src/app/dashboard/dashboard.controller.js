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

          $rootScope.$broadcast('titleChanged', event.name);
          vm.event = event;

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
          _match.canGetFaceook = true;
        }, function () {
          // get match from attending list ...
          _event.attending.forEach(function (attendingUser) {
            if (attendingUser.id === _match.id.toString()) {
              _match = attendingUser;
              _match.canGetFacebook = false;
            }
          });
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

          vm.user = _user;
          vm.event = _event;
          vm.match = _match;
        });
    }

    function setMatches() {
      secretSantaFactory.setMatches(vm.event)
        .then(function (response) {
          console.log('got response', response);
        });
    }
  }
})();
