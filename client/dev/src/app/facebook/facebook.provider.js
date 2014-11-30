(function () {
  'use strict';

  angular
    .module('facebook')
    .provider('facebook', facebookProvider);

  /* @ngInject */
  function facebookProvider() {

    var facebookAppId;

    var provider = {
      init: init,
      $get: $get
    };

    return provider;

    //////////

    function init(appId) {
      if (typeof appId !== 'string') {
        throw 'Facebook appid must be type string';
      }

      facebookAppId = appId;
    }

    /* @ngInject */
    function $get($q) {

      var service = {
        login: login,
        getAppId: getAppId,
        getEvent: getEvent,
        getLoginStatus: getLoginStatus
      };

      return service;

      function getAppId() {
        return facebookAppId;
      }

      function login() {
        var deferred = $q.defer();

        var permissions = 'user_events';

        FB.login(function (response) {
          var isLoggedIn = (response.status === 'connected');
          deferred.resolve(isLoggedIn);
        }, {
          scope: permissions
        });

        return deferred.promise;
      }

      function getLoginStatus() {
        var deferred = $q.defer();

        FB.getLoginStatus(function (response) {
          if (response.error) {
            deferred.reject(response.error);
            return;
          }

          deferred.resolve(response.status === 'connected');
        });

        return deferred.promise;
      }

      function getEvent(facebookEventId) {
        var deferred = $q.defer();

        var eventInfoPromise = _getEventInfo(facebookEventId);
        var eventAttendingPromise = _getAttending(facebookEventId);
        var promises = [eventInfoPromise, eventAttendingPromise];

        $q.all(promises)
          .then(function (data) {
            var event = data[0];
            event.attending = data[1];
            deferred.resolve(event);
          });

        return deferred.promise;

        function _getEventInfo(facebookEventId) {
          var deferred = $q.defer();
          var url = '/' + facebookEventId;

          FB.api(url, function (response) {
            if (response.error) {
              deferred.reject(response.error);
              return;
            }

            deferred.resolve(response);
          });

          return deferred.promise;
        }

        function _getAttending(facebookEventId) {
          var deferred = $q.defer();
          var url = '/' + facebookEventId + '/attending';

          FB.api(url, function (response) {
            if (response.error) {
              deferred.reject(response.error);
              return;
            }

            deferred.resolve(response.data);
          });

          return deferred.promise;
        }
      }
    }
  }
})();
