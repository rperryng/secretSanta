(function () {
  'use strict';

  angular
    .module('secretSanta')
    .config(config);

  /* @ngInject */
  function config($stateProvider) {

    $stateProvider
      .state('dashboard', {
        url: 'dashboard',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
        templateUrl: 'dashboard/dashboard.partial.html'
      });
  }
})();
