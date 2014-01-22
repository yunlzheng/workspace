'use strict';

var mongoose = require('mongoose'),
  Thing = mongoose.model('Thing'),
  User = mongoose.model('User'),
  Project = mongoose.model('Project'),
  Term = mongoose.model('Term');

/**
 * Populate database with sample application data
 */
User.find({}).remove(function() {

  User.create({
    name: 'dev01',
    info: 'development test user',
    email: 'dev01@dev.com',
    password: '123456'
  },{
    name: 'dev-test',
    info: 'development test user',
    email: 'dev02@dev.com',
    password: '123456'
  }, function() {

    console.log('finished populating users');

    Term.find({}).remove(function() {

      var query = User.findOne({'email': 'dev01@dev.com'});
      query.exec(function(err, user) {

        Term.create({
          name: 'DevTerms',
          info: 'Terms for development',
          creater: user
        },{
          name: 'DevTerms2',
          info: 'Terms for development',
          creater: user
        }, function(err, term) {
          
          Project.find({}).remove(function(){

            term.createProject({
              name: 'project01',
              info: 'create project for terms',
              term: term
            }, function(){});

          });
          console.log('finished populating terms');

        });

      });
     
    });

  })

});



//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});
