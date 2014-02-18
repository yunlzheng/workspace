'use strict';

angular.module('towerApp')
  .controller('ProjectSettingCtrl', ['$scope', '$routeParams', '$http', '$modal', function ($scope, $routeParams, $http, $modal) {
    
    $scope.project_id = $routeParams.project;
    $http.delete('/api/projects/'+$routeParams.project).success(function(data){
          // $scope.project = data;
          // $scope.project.name = "Hello World";

          // $http.put('/api/projects/'+$routeParams.project, $scope.project).success(function(data){
          // //$scope.project = data;
          // });

    });

    
    // $http.delete('/api/projects/'+$routeParams.project).success(function(data){
    //       $scope.project = data;
    // });

  }])
  .controller('DeleteProjectModelCtrl', [function(){
    
  }]);
