'use strict';

var mongoose = require('mongoose'),
    Term = mongoose.model('Term'),
    Project = mongoose.model('Project');

exports.projects = function(req,res) {
    return Project.find({}, function(err, projects){
        if(!err) {
            return res.json(projects);
        }else {
            return res.send(err);
        }
    });
}

exports.show = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    return Project.findById(id, function(err, project){
        if(!err) {
            return res.json(project);
        }else {
            return res.send(err);
        }
    });
}

exports.newDiscuss = function(req, res) {



};

exports.newTask = function(req, res) {

}