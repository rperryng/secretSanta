(function () {
  'use strict';

  angular
    .module('secretSanta')
    .config(config);

  /* @ngInject */
  function config($stateProvider) {

    $stateProvider
      .state('login', {
        url: 'login',
        controller: 'LoginController as login',
        templateUrl: 'login/login.partial.html'
      });
  }
})();
