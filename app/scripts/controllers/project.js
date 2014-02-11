'use strict';

angular.module('towerApp')
  .controller('ProjectCtrl', ['$scope', '$routeParams', '$http' ,function ($scope, $routeParams, $http) {

        $scope.projectId = $routeParams.project;

    	$http.get('/api/projects/'+$routeParams.project).success(function(data){
    		$scope.project = data;
    	});

    	$http.get('/api/projects/'+$routeParams.project+'/discuss').success(function(data){
    		$scope.discusses = data;
    	});

        $http.get('/api/projects/'+$routeParams.project+'/tasks').success(function(data){
            $scope.tasks = data;
        });

        $scope.showNewDissuss = false;
        $scope.showNewTask = false;

    	$scope.newDiscuss = function(discuss){
    		
    		$http.post('/api/projects/'+$routeParams.project+'/discuss/new', discuss).success(function(data){
    		 	$scope.discusses.unshift(data);
                $scope.showNewDissuss = false;
                $scope.discuss = {};
    		});

    	};

        $scope.newTask = function(taskList){

            taskList.project = $routeParams.project;
            $http.post('/api/projects/'+$routeParams.project+'/tasks/new', taskList).success(function(data){
                $scope.tasks.unshift(data);
                $scope.showNewTask = false;
                $scope.tasklist = {};
            });

        };

        $scope.removeTask = function(index) {

            var tasklist = $scope.tasks[index];
            $http.delete('/api/tasks/'+tasklist._id).success(function(data){
                $scope.tasks.splice(index, 1);
            });
           
        };

  }]);
