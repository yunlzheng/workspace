'use strict';

var mongoose = require('mongoose'),
    Discuss = mongoose.model('Discuss');

module.exports = {

  show: function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id); // Discuss ID
   
    return Discuss.findById(id, function (err, thing) {
  
      if (!err) {
        return res.json(thing);
      } else {
        return res.send(err);
      }
      
    });
  },

  remove: function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id); // Discuss ID
    return Discuss.find({_id: id, author: req.user}).remove(function(err, count){
        if(!err) {
            return res.json({});
        }else {
            return res.send(err);
        }
    });
  }

}
