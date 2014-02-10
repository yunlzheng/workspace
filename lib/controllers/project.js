'use strict';

var mongoose = require('mongoose'),
    Term = mongoose.model('Term'),
    Project = mongoose.model('Project'),
    Discuss = mongoose.model('Discuss');

exports.projects = function(req,res) {
    return Project.find({}, function(err, projects){
        if(!err) {
            return res.json(projects);
        }else {
            return res.send(err);
        }
    });
};

exports.discuss = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id); // Project ID

    return Project.findById(id, function(err, project){ 
        if(!err) {
            return Discuss.find({project: project}, null, {sort: [['create_at', -1]]}, function(err, discusses){
                if(!err) {
                    return res.json(discusses);
                }else {
                    return res.send(err);
                }
            });
        }
    });

};

exports.newDiscuss = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id); // Project ID
    return Project.findById(id, function(err, project){

        if(!err) {
            var discuss = new Discuss(req.body);
            discuss.project = project;
            discuss.author = req.user;
            return discuss.save(function(err, discuss) {

                if(!err) {
                    return res.json(discuss);
                }else {
                    return res.send(err);
                }

            });
        }

    });

};

exports.show = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    return Project.findById(id, function(err, project){
        if(!err) {
            return res.json(project);
        }else {
            return res.send(err);
        }
    });
};

exports.newTask = function(req, res) {

};