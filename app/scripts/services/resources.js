angular.module('tower.resources', []);
angular.module('tower.resources').factory('Term', ['$resource', function($resource){
	return $resource('/api/terms/:termId', {termId:'@id'});
}]);
angular.module('tower.resources').factory('Project', ['$resource', function($resource){
	return $resource('/api/projects/:projectId', {projectId:'@id'});
}]);