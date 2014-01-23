'use strict';

angular.module('towerApp')
  .controller('ProjectsCtrl', function ($scope, $routeParams, $http) {
    var termId = $routeParams.term;
    $http.get('/api/terms/'+termId+'/projects').success(function(data){

        console.log(data);

    });

  });
