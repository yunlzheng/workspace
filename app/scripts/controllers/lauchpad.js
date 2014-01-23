'use strict';

angular.module('towerApp')
	.controller('NewTermCtrl', function ($scope, $resource, $modalInstance, Term) {

	$scope.ok = function (term) {

		new Term(term).$save();
		$modalInstance.close('success');
	
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

angular.module('towerApp')
  .controller('LanchpadCtrl', ['$scope', '$resource','$modal', 'Term',function ($scope, $resource, $modal, Term) {
     
      $scope.terms = Term.query();

      $scope.open = function () {

		var modalInstance = $modal.open({
		  templateUrl: '/modal/newTerm.html',
		  controller: 'NewTermCtrl',
		  windowClass: 'tower-modal'
		});

		modalInstance.result.then(function (result) {
		  if(result){
		  	$scope.terms = Term.query();
		  }
		}, function () {
		 
		});
	  };
      
  }]);