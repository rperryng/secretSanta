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
        logout: logout,
        getAppId: getAppId,
        getEvent: getEvent,
        getLoginStatus: getLoginStatus,
        getMe: getMe,
        getUser: getUser,
        getUserPicture: getUserPicture,
        getUserLikes: getUserLikes
      };

      return service;

      function getAppId() {
        return facebookAppId;
      }

      function login() {
        var deferred = $q.defer();

        var permissions = 'user_events, user_likes';

        FB.login(function (response) {
          var isLoggedIn = (response.status === 'connected');
          deferred.resolve(isLoggedIn);
        }, {
          scope: permissions
        });

        return deferred.promise;
      }

      function logout() {
        FB.logout();
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

      function getMe() {
        var deferred = $q.defer();

        FB.api('/me', function (response) {
          if (response.error) {
            deferred.reject(response.error);
            return;
          }

          deferred.resolve(response);
        });

        return deferred.promise;
      }

      function getUser(facebookUserId) {
        var deferred = $q.defer();
        var url = '/' + facebookUserId;

        FB.api(url, function (response) {
          if (response.error) {
            deferred.reject(response.error);
            return;
          }

          deferred.resolve(response);
        });

        return deferred.promise;
      }

      function getUserPicture(facebookUserId, size) {
        var deferred = $q.defer();

        var url = '/' + facebookUserId + '/picture';
        var params = {};

        if (size) {
          params = {
            width: size,
            height: size
          };
        }

        FB.api(url, params, function (response) {
          if (response.error) {
            deferred.reject(response.error);
            return;
          }

          deferred.resolve(response.data.url);
        });

        return deferred.promise;
      }

      function getUserLikes(facebookUserId) {
        var deferred = $q.defer();

        var url = '/' + facebookUserId + '/likes';

        FB.api(url, function (response) {
          if (response.error) {
            deferred.reject(response.error);
            return;
          }

          deferred.resolve(response);
        });

        return deferred.promise;
      }
    }
  }
})();
