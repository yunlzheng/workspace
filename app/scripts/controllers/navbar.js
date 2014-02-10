'use strict';

angular.module('towerApp')
  .controller('NavbarCtrl', function ($scope, $location) {

    $scope.menu = [{
      'title': '项目',
      'link': '#/'
    },
    {
      'title': '回顾',
      'link': '#/progress'
    },
    {
      'title': '日历',
      'link': '#/calendars'
    },
    {
      'title': '团队',
      'link': '#/members'
    },
    {
      'title': '统计',
      'link': '#/stats'
    },{
      'title': '我自己',
      'link': '#/me'
    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
