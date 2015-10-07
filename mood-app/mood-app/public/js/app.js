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

    angular.module('mood-app').controller('mainController', function($http) {
  
        // bind the controller to vm (view-model)
        var vm = this;
  
        // create a new time variable with the current date
        vm.time = new Date();

        vm.submit = function () {
            console.log({ "mood": vm.selectedMood, "timestamp": vm.time, "comment": vm.description });
        }
  
    });    
})();