'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
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

    // use local strategy
    passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password'
        },
        function(email, password, done) {
          User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err) }
            if (!user) {
              return done(null, false, { message: 'Unknown user' });
            }
            if (!user.authenticate(password)) {
              return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user);
          })
        }
    ));

    // use google strategy
    passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (!user) {
          user = new User({
            name: profile.username,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            google: profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        } else {
          return done(err, user)
        }
      })
    }
    ));

    // use github strategy
    passport.use(new GitHubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'github.id': profile.id }, function (err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'github',
            github: profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        } else {
          return done(err, user)
        }
      })
    }
    ));
}