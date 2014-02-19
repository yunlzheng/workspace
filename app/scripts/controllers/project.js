'use strict';

angular.module('towerApp')
  .controller('ProjectCtrl', ['$scope', '$routeParams', '$dialogs', 'Project', function ($scope, $routeParams, $dialogs, Project) {

       
        $scope.projectId = $routeParams.project;

        $scope.project = Project.get({id: $routeParams.project});

        $scope.popover = {
          "content": "指派任务"
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };
        
        $scope.today();

        $scope.showWeeks = false;

        $scope.showButtonBar = false;
 

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };


        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        $scope.format = 'yyyy年MM月dd日';

        $scope.states = ['zheng', 'Alaska'];

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
        console.log(data);
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
            angular.forEach(task.todos, function(atodo, index){
                if(atodo._id === todo._id){
                    task.todos.splice(index, 1);
                    return;
                }
            });
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
