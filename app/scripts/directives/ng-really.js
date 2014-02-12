/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure?" ng-really-click="takeAction()" function
 */
angular.module('tower.directives',[])
    .directive('ngReallyClick', ['$dialogs', function($dialogs) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {

            element.bind('click', function() {

                var message = attrs.ngReallyMessage? attrs.ngReallyMessage: 'really click'
                var dlg = $dialogs.confirm(message, '');
               
                dlg.result.then(function(btn){
                    
                    $scope.$eval(attrs.ngReallyClick);
                    //$scope.$apply(attrs.ngReallyClick);
                    
                
                },function(btn){
                });

            });

        }
    }
}]);