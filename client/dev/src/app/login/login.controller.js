(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController(facebook) {
    var controller = this;

    controller.login = login;

    ////////

    function login() {
      facebook.login();
    }
  }
})();
