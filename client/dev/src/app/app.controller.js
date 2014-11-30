(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('AppController', AppController);

  /* @ngInject */
  function AppController($scope, $state, facebook) {
    var vm = this;

    vm.showNavBar = false;
    vm.logout = logout;

    var unbindFacebookReadyListener = $scope.$on('facebookReady', onFacebookReady);
    $scope.$on('loginChanged', onLoginChanged);

    //////////

    function logout() {
      facebook.logout();
      vm.showNavBar = false;
      $state.go('login');
    }

    function onFacebookReady() {
      unbindFacebookReadyListener();

      facebook.getLoginStatus()
        .then(function (isLoggedIn) {
          vm.showNavBar = isLoggedIn;
          var nextState = isLoggedIn ? 'dashboard' : 'login';
          $state.go(nextState);
        });
    }

    function onLoginChanged(isLoggedIn) {
      vm.showNavBar = isLoggedIn;
    }
  }
})();
