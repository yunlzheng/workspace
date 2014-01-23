'use strict';

var api = require('./controllers/api'),
    index = require('./controllers/index'),
    user = require('./controllers/user');

/**
 * Application routes
 */
module.exports = function(app, passport) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  app.get('/api/users', user.users);
  app.get('/api/users/:id', user.show);
  app.post('/api/users', user.create);
  app.delete('/api/users/:id', user.delete);
  app.put('/api/users/:id', user.update);
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/', ensureAuthenticated, index.index);
  app.get('/login', user.login);

  app.get('/auth/github',
    passport.authenticate('github'),
    function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
    }
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
    }), function(req, res){

    });

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