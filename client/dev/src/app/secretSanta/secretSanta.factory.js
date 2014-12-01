(function () {
  'use strict';

  angular
    .module('secretSanta')
    .factory('secretSantaFactory', secretSantaFactory);

  /* @ngInject */
  function secretSantaFactory($q, $http) {
    var factory = {
      getMatch: getMatch
    };

    return factory;

    //////////

    function getMatch(facebookUserId) {
      var url = '/api/users/' + facebookUserId;
      return $http.get(url);
    }
  }
})();
