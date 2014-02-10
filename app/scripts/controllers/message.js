'use strict';

angular.module('towerApp')
  .controller('MessageCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
      
      $scope.project = $routeParams.project;
      $scope.message = $routeParams.message;
      
      $http.get('/api/projects/'+$routeParams.project).success(function(data){
    	  $scope.project = data;
      });

      $http.get('/api/discusses/'+ $routeParams.message).success(function(data){
      	$scope.message = data;
      });

      $scope.remove = function(){
        $http.delete('/api/discusses/'+$routeParams.message).success(function(data){
          $location.path("/projects/"+$routeParams.project);
        });;
      }

  }]);