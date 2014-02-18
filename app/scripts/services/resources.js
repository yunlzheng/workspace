angular.module('tower.resources', []);
angular.module('tower.resources')
    .factory('Term', ['$resource', function($resource){

	   return $resource('/api/terms/:id', null);

    }])
    .factory('Project', ['$resource', function($resource){
    
        return $resource('/api/projects/:id', null, {
            discuss: {
                method: 'GET',
                isArray: true,
                url: '/api/projects/:id/discuss'
            },
            newDiscuss: {
                method: 'POST',
                url: '/api/projects/:id/discuss/new'
            },
            tasks: {
                method: 'GET',
                isArray: true,
                url: '/api/projects/:id/tasks'
            },
            newTask: {
                method: 'POST',
                url: '/api/projects/:id/tasks/new'
            },
            completedTasks: {
                method: 'GET',
                isArray: true,
                url: '/api/projects/:id/tasks/completed'
            }
        });
    
    }])
    .factory('User', ['$resource', function($resource){
    
        return $resource('/api/users/:id');
    
    }]);