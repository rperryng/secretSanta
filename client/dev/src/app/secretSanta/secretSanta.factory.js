(function () {
  'use strict';

  angular
    .module('secretSanta')
    .factory('secretSantaFactory', secretSantaFactory);

  /* @ngInject */
  function secretSantaFactory($q, $http) {
    var factory = {
      getMatch: getMatch,
      setMatches: setMatches
    };

    return factory;

    //////////

    function getMatch(facebookUserId) {
      var url = '/api/users/' + facebookUserId;
      return $http.get(url);
    }

    function setMatches(event) {
      var url = '/api/users';
      return $http.post(url, event);
    }
  }
})();
