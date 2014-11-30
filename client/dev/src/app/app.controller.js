(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('AppController', AppController);

  /* @ngInject */
  function AppController($scope, $state, facebook) {

    $scope.$on('facebookReady', onFacebookReady);

    //////////

    function onFacebookReady() {
      facebook.getLoginStatus()
        .then(function (isLoggedIn) {
          var nextState = isLoggedIn ? 'dashboard' : 'login';
          $state.go(nextState);
        });
    }
  }
})();
