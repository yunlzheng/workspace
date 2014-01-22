'use strict';

var mongoose = require('mongoose'),
    GitHubStrategy = require('passport-github').Strategy,
    User = mongoose.model('User');

module.exports = function(passport, config) {

    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this example does not
    //   have a database of user records, the complete GitHub profile is serialized
    //   and deserialized.
    passport.serializeUser(function(user, done) {
      //done(null, user);
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
       User.findOne({ _id: id }, function (err, user) {
          done(err, user);
       })
    });

    // Use the GitHubStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and GitHub
    //   profile), and invoke a callback with a user object.
    passport.use(new GitHubStrategy({
        clientID: config.github.client_id,
        clientSecret: config.github.client_secret,
        callbackURL: config.github.callback_url
      },
      function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        User.findOne({email: profile.email}, function(err, user){
          if (err) { return done(err) }

          if(!user){
            user = new User({
              name: profile._json.login,
              email: profile._json.email,
              info: profile._json.email,
              avatar: profile._json.avatar_url
            });
            user.save(function (err) {
              if (err) console.log(err)
              return done(err, user);
            })
          }else{
            return done(err, user);
          }

        });
        
      }
    ));
}