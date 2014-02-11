'use strict';

var mongoose = require('mongoose'),
    Task = mongoose.model('Task');


module.exports = {
    remove: function(req, res) {
        var id = mongoose.Types.ObjectId(req.params.id); // Discuss ID
        return Task.find({_id: id}).remove(function(err, count){
            if(!err) {
                return res.json({});
            }else {
                return res.send(err);
            }
        });
      } 
}