'use strict';

angular.module('towerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'tower.resources',
  'ui.bootstrap.modal'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/launchpad',
        controller: 'LanchpadCtrl'
      })
      .when('/terms/:term', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/progress', {
        templateUrl: 'partials/progress',
        controller: 'ProgresCtrl'
      })
      .when('/calendars', {
        templateUrl: 'partials/calendars',
        controller: 'CalendarCtrl'
      })
      .when('/members', {
        templateUrl: 'partials/members',
        controller: 'MemberCtrl'
      })
      .when('/stats', {
        templateUrl: 'partials/stats',
        controller: 'StatCtrl'
      })
      .when('/me', {
        templateUrl: 'partials/me',
        controller: 'MeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    //$locationProvider.html5Mode(true);
  });