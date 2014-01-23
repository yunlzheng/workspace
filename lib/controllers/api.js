'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    User = mongoose.model('User');

module.exports = {

  users: function(req, res) {

    return User.find(function(err, users){

        if (!err) {
            return res.json(users);
        } else {
            return res.send(err);
        }

    });  

  },
  awesomeThings: function(req, res) {

    return Thing.find(function (err, things) {
      if (!err) {
        return res.json(things);
      } else {
        return res.send(err);
      }
    });
  }

}
