(function () {
    'use strict';

    angular.module('mood-app', [
        'oc.lazyLoad',
        'ui.router',
        'ngResource',
        'angular-loading-bar',
        'ngSanitize',
        'ngCookies',
        'angular-mood',
        'angularMoment'
    ]);

    angular.module('mood-app').constant('API_CONFIG', {
    url: 'http://localhost:8080/api/',
    })

    angular.module('mood-app').controller('mainController', mainController);

    mainController.$inject = ['moodService', '$cookies'];

    function mainController(moodService, $cookies) {

        // bind the controller to vm (view-model)
        var vm = this;

        // create a new time variable with the current date
        vm.time = new Date();

        vm.submit = function () {
            var sessionid = $cookies.get('moodcookie');
            var promisePostMoodRecord  = moodService.postMoodRecord(
              { "userid" : sessionid,
                "created": vm.time,
                "mood": [vm.selectedMood],
                "description": vm.description
              });
            promisePostMoodRecord.then(function (successResponse) {

            },function (errorResponse) {

            });
        }

    };

})();
