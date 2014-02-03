'use strict';

angular.module('towerApp')
  .controller('ProjectCtrl', ['$scope', '$routeParams', '$http' ,function ($scope, $routeParams, $http) {

    	$http.get('/api/projects/'+$routeParams.project).success(function(data){
    		$scope.project = data;
    	});

    	$http.get('/api/projects/'+$routeParams.project+'/discuss').success(function(data){
    		$scope.discusses = data;
    	});

        $scope.showNewDissuss = false;

    	$scope.newDiscuss = function(discuss){
    		
    		$http.post('/api/projects/'+$routeParams.project+'/discuss/new', discuss).success(function(data){
    		 	$scope.discusses.push(data);
    		});
    	};

  }]);
