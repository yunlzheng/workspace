'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.login = function(req, res) {
  res.render('users/login', {
    title: 'Login',
    message: req.flash('error')
  });
}


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
   
    return User.create(req.body, function(err, user){
        if(!err) {
            return res.json(user);
        }else {
            return res.send(err);
        }
    })

}

exports.delete = function(req, res) {
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
