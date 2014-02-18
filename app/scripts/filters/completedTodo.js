'use strict';

angular.module('towerApp')
    .filter('completed', function(){

        var completedFilter = function(todos){

            var completed = [];
            angular.forEach(todos, function(todo){
                
                if(todo.completed){
                    completed.push(todo);
                }
            });
            return completed;

        }

        return completedFilter;

    })
    .filter('unCompleted', function(){

        var unCompletedFilter = function(todos){

            var unCompleted = [];
            angular.forEach(todos, function(todo){
                
                if(todo.completed === false){
                    unCompleted.push(todo);
                }
            });
            return unCompleted;

        }

        return unCompletedFilter;

    });