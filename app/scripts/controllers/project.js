'use strict';

angular.module('towerApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, $http) {
   
    	$http.get('/api/projects/'+$routeParams.project).success(function(data){
    		$scope.project = data;
    	});

  });
