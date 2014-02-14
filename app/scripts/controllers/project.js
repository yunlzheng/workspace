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
            $http.post('/api/tasks/'+task._id+'/todos/new', todo).success(function(data){
                task.todos.push(data);
                todo = {};
            });
        };

        $scope.updateTodo = function(task, index) {

            var todo = task.todos[index];
            $http.put('/api/tasks/'+task._id+'/todos/'+todo._id, todo);

        };

        $scope.runTodo = function(task, index) {
            var todo = task.todos[index];
            todo.run = true;
            $http.put('/api/tasks/'+task._id+'/todos/'+todo._id+'/start');
        };

        $scope.stopTodo = function(task, index) {
            var todo = task.todos[index];
            todo.run = false;
            $http.put('/api/tasks/'+task._id+'/todos/'+todo._id+'/stop');
        };

        $scope.removeTodo = function(task, index) {
           $http.delete('/api/tasks/'+task._id+'/todos/'+task.todos[index]._id).success(function(){
                task.todos.splice(index, 1);
           });
           
        };

        $scope.removeTask = function(index) {

            var task = $scope.tasks[index];
            $http.delete('/api/tasks/'+task._id).success(function(data){
                $scope.tasks.splice(index, 1);
            });
           
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
