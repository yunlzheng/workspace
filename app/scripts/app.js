'use strict';

angular.module('towerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/progress', {
        templateUrl: 'partials/progress',
        controller: 'ProgressCtrl'
      })
      .when('/calendars', {
        templateUrl: 'partials/calendars',
        controller: 'CalendarCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });