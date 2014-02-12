'use strict';

angular.module('towerApp')
  .controller('ProjectCtrl', ['$scope', '$routeParams', '$http', '$dialogs',function ($scope, $routeParams, $http, $dialogs) {

       
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
                console.log(data);
    		 	$scope.discusses.unshift(data);
                $scope.showNewDissuss = false;
                $scope.discuss = {};
    		});

    	};

        $scope.newTask = function(taskList){

            taskList.project = $routeParams.project;
            $http.post('/api/projects/'+$routeParams.project+'/tasks/new', taskList).success(function(data){
                data.addTodoing = true;
                $scope.tasks.unshift(data);
                $scope.showNewTask = false;
                $scope.tasklist = {};
            });

        };

        $scope.newTodo = function(index, todo){
            var task = $scope.tasks[index];
            $http.post('/api/tasks/'+task._id+'/todo/new', todo).success(function(data){
                task.todos.push(data);
                $scope._todo = {};
            });
        };

        $scope.removeTask = function(index) {

            var task = $scope.tasks[index];
            $http.delete('/api/tasks/'+task._id).success(function(data){
                $scope.tasks.splice(index, 1);
            });
           
        };

        $scope.removeTodo = function(todo) {

           console.log(todo);
           
        };

        $scope.toggleEditTask = function(index) {

            var task = $scope.tasks[index];
            task.editing = !task.editing;

        };

        $scope.toggkeTodoView = function(index){
            var task = $scope.tasks[index];
            task.addTodoing = !task.addTodoing;
        }

        $scope.updateTask = function(task) {

            task.editing = !task.editing;
            $http.put('/api/tasks/'+ task._id, task).success(function(data){

                task = data;

            });

        };

  }]);
