'use strict';

angular.module('towerApp')
  .controller('ProjectSettingCtrl', ['$scope', '$routeParams', '$http', '$modal', function ($scope, $routeParams, $http, $modal) {
    
    $scope.project_id = $routeParams.project;
    $http.get('/api/projects/'+$routeParams.project).success(function(data){
          $scope.project = data;
    });
    
    //$http.put('/api/projects/'+$routeParams.project, $scope.project)
    //$http.delete('/api/projects/'+$routeParams.project)
   

  }])
  .controller('DeleteProjectModelCtrl', [function(){
    
  }]);
