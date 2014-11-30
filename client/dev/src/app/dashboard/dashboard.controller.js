(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController($rootScope, facebook, facebookEventId) {
    var vm = this;

    vm.event = undefined;

    activate();

    //////////

    function activate() {
      facebook.getEvent(facebookEventId)
        .then(function (event) {
          $rootScope.$broadcast('titleChanged', event.name);
          vm.event = event;
        });
    }
  }
})();
