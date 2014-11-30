(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('DashboardController', DashboardController);

  /* @ngInject */
  function DashboardController() {
    var vm = this;

    activate();

    //////////

    function activate() {
      console.log('hello world');
    }
  }
})();
