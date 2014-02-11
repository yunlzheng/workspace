'use strict';

var mongoose = require('mongoose'),
    Term = mongoose.model('Term'),
    Project = mongoose.model('Project'),
    TaskList = mongoose.model('TaskList'),
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

exports.tasks = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id); // Project ID

    return Project.findById(id, function(err, project){ 
        if(!err) {
            return TaskList.find({project: project}, null, {sort: [['create_at', -1]]}, function(err, taskLists){
                if(!err) {
                    return res.json(taskLists);
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

exports.createTaskList = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id); // Project ID
    return Project.findById(id, function(err, project){
        if(!err) {
            var taskList = TaskList(req.body);
            taskList.project = project;
            taskList.creater = req.user;
            return taskList.save(function(err, list){
                if(!err) {
                    return res.json(list);
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
