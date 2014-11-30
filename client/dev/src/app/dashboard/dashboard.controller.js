(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController($rootScope, $q, $state, facebook, facebookEventId) {
    var vm = this;

    vm.event = undefined;
    vm.user = undefined;

    activate();

    //////////

    function activate() {
      facebook.getMe()
        .then(function (user) {
          vm.user = user;
          return facebook.getEvent(facebookEventId);
        })
        .then(function (event) {
          var validUser = event.attending.some(function (attendingUser) {
            return (attendingUser.id === vm.user.id);
          });

          if (!validUser) {
            facebook.logout();
            $state.go('login');
            return $q.reject();
          }

          $rootScope.$broadcast('titleChanged', event.name);
          vm.event = event;
        });
    }
  }
})();
