(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController($rootScope, $state, facebook) {
    var controller = this;

    controller.login = login;

    ////////

    function login() {
      facebook.login()
        .then(function (isLoggedIn) {
          $rootScope.$broadcast('loginChanged', isLoggedIn);
          $state.go('dashboard');
        });
    }
  }
})();
