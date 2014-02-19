'use strict';

angular.module('towerApp')
  .controller('ProjectCtrl', ['$scope', '$routeParams', '$dialogs', 'Project', function ($scope, $routeParams, $dialogs, Project) {

       
        $scope.projectId = $routeParams.project;

        $scope.project = Project.get({id: $routeParams.project});

        $scope.popover = {
          "content": "指派任务"
        };

  }])
  .controller('SubDiscussCtrl', ['$scope', '$routeParams', '$dialogs','Project',function ($scope, $routeParams, $dialogs, Project) {

    $scope.showNewDissuss = false;
    
    $scope.discusses = Project.discuss({id: $routeParams.project}); 
    
    $scope.newDiscuss = function(discuss){
        
        if(!discuss.content){
            discuss.content = 'RT.';
        }
        var data = Project.newDiscuss({id: $routeParams.project}, discuss);
        $scope.discusses.unshift(data);
        $scope.showNewDissuss = false;
        $scope.discuss = {};

    };

  }])
  .controller('SubTasksCtrl', ['$scope', '$routeParams', '$http', '$dialogs', 'Project', function ($scope, $routeParams, $http, $dialogs, Project) {

    $scope.showNewTask = false;

    $scope.tasks = Project.tasks({id: $routeParams.project});

    $scope.completedTodos = Project.completedTasks({id: $routeParams.project});


    $scope.newTask = function(taskList){

        taskList.project = $routeParams.project;
        var data = Project.newTask({id: $routeParams.project}, taskList);
        data.addTodoing = true;
        $scope.tasks.unshift(data);
        $scope.showNewTask = false;
        $scope.tasklist = {};

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
