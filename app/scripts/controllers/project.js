'use strict';

angular.module('towerApp')
  .controller('ProjectCtrl', ['$scope', '$routeParams', '$http', '$dialogs',function ($scope, $routeParams, $http, $dialogs) {

       
        $scope.projectId = $routeParams.project;

    	$http.get('/api/projects/'+$routeParams.project).success(function(data){
    		$scope.project = data;
    	});

  }])
  .controller('SubDiscussCtrl', ['$scope', '$routeParams', '$http', '$dialogs',function ($scope, $routeParams, $http, $dialogs) {

    $scope.showNewDissuss = false;
    $http.get('/api/projects/'+$routeParams.project+'/discuss').success(function(data){
            $scope.discusses = data;
    });
    $scope.newDiscuss = function(discuss){
            
        $http.post('/api/projects/'+$routeParams.project+'/discuss/new', discuss).success(function(data){
            $scope.discusses.unshift(data);
            $scope.showNewDissuss = false;
            $scope.discuss = {};
        });

    };

  }])
  .controller('SubTasksCtrl', ['$scope', '$routeParams', '$http', '$dialogs',function ($scope, $routeParams, $http, $dialogs) {

    $scope.showNewTask = false;

    $http.get('/api/projects/'+$routeParams.project+'/tasks').success(function(data){
            $scope.tasks = data;
    });  

    $http.get('/api/projects/'+$routeParams.project+'/tasks/completed').success(function(data){
        $scope.completedTodos = data;
    });

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

    $scope.updateTodo = function(task, todo) {

        $http.put('/api/tasks/'+task._id+'/todos/'+todo._id, todo);

    };

    $scope.runTodo = function(task, todo) {
        todo.run = true;
        $http.put('/api/tasks/'+task._id+'/todos/'+todo._id+'/start');
    };

    $scope.stopTodo = function(task, todo) {
        todo.run = false;
        $http.put('/api/tasks/'+task._id+'/todos/'+todo._id+'/stop');
    };

    $scope.removeTodo = function(task, todo) {
       $http.delete('/api/tasks/'+task._id+'/todos/'+todo._id).success(function(){
            task.todos.splice(index, 1);
       });
       
    };

    $scope.removeTask = function(task) {

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
