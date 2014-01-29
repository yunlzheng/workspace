'use strict';

angular.module('towerApp')
  .controller('ProjectsCtrl', function ($scope, $routeParams, $http) {
    $scope.termId = $routeParams.term;
    $http.get('/api/terms/'+$scope.termId+'/projects').success(function(data){

        $scope.projects = data;

    });

  });
