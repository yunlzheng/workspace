'use strict';

angular.module('towerApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, $http) {
    	
    	console.log($routeParams.project);
    	$http.get('/api/projects/'+$routeParams.project).success(function(data){
    		console.log(data);
    	});

  });
