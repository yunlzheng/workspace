'use strict';

angular.module('towerApp')
  .controller('MessageCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
      $scope.project = $routeParams.project;
      $scope.message = $routeParams.message;
      $http.get('/api/projects/'+$routeParams.project).success(function(data){
    	$scope.project = data;
      });

  }]);