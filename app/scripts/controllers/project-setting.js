'use strict';

angular.module('towerApp')
  .controller('ProjectSettingCtrl', ['$scope', '$routeParams', '$http', '$modal', function ($scope, $routeParams, $http, $modal) {
    
    $scope.project = $routeParams.project;
    $http.get('/api/projects/'+$routeParams.project).success(function(data){
          $scope.project = data;
    });

  }])
  .controller('DeleteProjectModelCtrl', [function(){
    
  }]);
