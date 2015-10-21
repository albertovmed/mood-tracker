(function () {
    'use strict';
    angular.module('mood-app').service("moodService", apiService);

    apiService.$inject = ['$http', 'API_CONFIG'];

    function apiService($http, API_CONFIG) {

      var self = this;

      self.postMoodRecord = function(moodRecord) {
        return $http({ url: API_CONFIG.url + "moods",  method: "POST",
        data: moodRecord,  headers: {'Content-Type': 'application/json'} })
      }

    };

})();
