'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');


var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

exports.login = function(req, res) {
  res.render('users/login', {
    title: 'Login',
    message: req.flash('error')
  });
}

/**
 * Session
 */

exports.session = login;

exports.users = function(req, res) {

    return User.find(function(err, users){

        if (!err) {
            return res.json(users);
        } else {
            return res.send(err);
        }

    });  
}

exports.show = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    return User.findById(id, function(err, user){

        if(!err) {
            return res.json(user);
        }else {
            return res.send(err);
        }

    });

}

exports.create = function(req, res) {
    
    var user = new User(req.body);
    user.provider = 'local'
    user.save(function(err){
        if(!err) {
            return res.json(user);
        }else {
            return res.send(err);
        }

        
    })

}

exports.remove = function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return User.findById(id).remove(function(err, count){
        if(!err) {
            return res.json({});
        }else {
            return res.send(err);
        }
    });
}

exports.update = function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return User.findOneAndUpdate({_id: id}, req.body, function(err, user){
        if(!err) {
            return res.json(user);
        }else {
            return res.send(err);
        }
    });
}
