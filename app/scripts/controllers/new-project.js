'use strict';

angular.module('towerApp')
  .controller('NewProjectCtrl', ['$scope', '$routeParams', '$http', '$location','Project', function ($scope, $routeParams, $http, $location, Project) {

      $scope.newProject = function(project){

      	project.term = $routeParams.term;
  		$http.post('/api/terms/'+$routeParams.term+'/projects', project).success(function(data){

  			if(data){
  				 $location.path('/terms/'+$routeParams.term);
  			}

  		});

      }

  }]);