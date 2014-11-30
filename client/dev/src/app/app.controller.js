(function () {
  'use strict';

  angular
    .module('secretSanta')
    .controller('AppController', AppController);

  /* @ngInject */
  function AppController($scope, $state, facebook) {

    var unbindFacebookReadyListener = $scope.$on('facebookReady', onFacebookReady);

    //////////

    function onFacebookReady() {
      unbindFacebookReadyListener();

      facebook.getLoginStatus()
        .then(function (isLoggedIn) {
          var nextState = isLoggedIn ? 'dashboard' : 'login';
          $state.go(nextState);
        });
    }
  }
})();
