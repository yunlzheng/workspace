'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index'),
    term = require('./controllers/term'),
    project = require('./controllers/project'),
    user = require('./controllers/user'),
    task = require('./controllers/task'),
    discuss = require('./controllers/discuss');

/**
 * Application routes
 */
module.exports = function(app, passport) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);

  // User API Routes
  app.get('/api/users', ensureAuthenticated, user.users);
  app.post('/api/users', user.create);
  app.get('/api/users/:id', user.show);
  app.put('/api/users/:id', user.update);
  app.del('/api/users/:id', user.remove);
  
  
  // Terms API Routes
  app.get('/api/terms', ensureAuthenticated, term.terms);
  app.post('/api/terms', ensureAuthenticated, term.create);
  app.get('/api/terms/:id', ensureAuthenticated, term.show);
  app.put('/api/terms/:id', ensureAuthenticated, term.update);
  app.del('/api/terms/:id', ensureAuthenticated, term.remove);
  app.get('/api/terms/:id/projects', ensureAuthenticated, term.projects);
  app.post('/api/terms/:id/projects', ensureAuthenticated, term.createProject);

  // Project API Routes
  app.get('/api/projects/:id', ensureAuthenticated, project.show);
  app.put('/api/projects/:id', ensureAuthenticated, project.update);
  app.del('/api/projects/:id', ensureAuthenticated, project.remove);
  app.get('/api/projects/:id/discuss', ensureAuthenticated, project.discuss);
  app.post('/api/projects/:id/discuss/new', ensureAuthenticated, project.newDiscuss);
  app.get('/api/projects/:id/tasks', ensureAuthenticated, project.tasks);
  app.get('/api/projects/:id/tasks/completed', ensureAuthenticated, project.completedTodos);
  app.post('/api/projects/:id/tasks/new', ensureAuthenticated, project.createTask);
  

  // Discuss API Routes
  app.get('/api/discusses/:id', ensureAuthenticated, discuss.show);
  app.del('/api/discusses/:id', ensureAuthenticated, discuss.remove);

  // TaskList API Routes
  app.put('/api/tasks/:id', ensureAuthenticated, task.update);
  app.del('/api/tasks/:id', ensureAuthenticated, task.remove);
  app.post('/api/tasks/:id/todos/new', ensureAuthenticated, task.newTodo);
  app.del('/api/tasks/:id/todos/:todo', ensureAuthenticated, task.removeTodo);
  app.put('/api/tasks/:id/todos/:todo/start', ensureAuthenticated, task.startTodo);
  app.put('/api/tasks/:id/todos/:todo/stop', ensureAuthenticated, task.stopTodo);
  app.put('/api/tasks/:id/todos/:todo', ensureAuthenticated, task.updateTodo);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/modal/*', index.modals);
  app.get('/', ensureAuthenticated, index.index);
  //app.get('/', index.index);
  app.get('/login', user.login);

  app.post('/users/session', 
    passport.authenticate('local',{
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }),user.session);

  app.get('/auth/github',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }),
    function(req, res){}
  );

  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    }
  );

  app.get('/auth/google',
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }), function(req, res){}
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }), function(req, res){
      res.redirect('/');
    }
  );

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.redirect('/login')
}