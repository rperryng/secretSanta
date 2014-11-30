(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController(facebook, facebookEventId) {
    var vm = this;

    activate();

    //////////

    function activate() {
      facebook.getEvent(facebookEventId)
        .then(function (event) {
          console.log('got event', event);
        });
    }
  }
})();
