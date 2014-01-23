'use strict';

angular.module('towerApp')
  .controller('LanchpadCtrl', ['$scope', '$resource', function ($scope, $resource) {
      
      var Term = $resource('/api/terms/:termId', {termId:'@id'});

      // var term = new Term({
      //   name: 'newTerm',
      //   info: 'create for Test'
      // });

      // term.$save();
      $scope.terms = Term.query();
      
  }]);