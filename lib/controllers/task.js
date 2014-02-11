'use strict';

var mongoose = require('mongoose'),
    Task = mongoose.model('Task');


module.exports = {
    update: function(req, res) {
        var id = mongoose.Types.ObjectId(req.params.id);
        var obj = req.body;
        delete obj._id;
        return Task.findOneAndUpdate({_id: id}, obj, function(err, task){
            if(!err) {
                return res.json(task);
            }else {
                return res.send(err);
            }
        });
    },
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