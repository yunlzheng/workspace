'use strict';

var mongoose = require('mongoose'),
    Term = mongoose.model('Term'),
    Project = mongoose.model('Project'),
    Task = mongoose.model('Task'),
    Todo = mongoose.model('Todo'),
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
            return Discuss.find({project: project}, null, {sort: [['create_at', -1]]}).populate('author').exec(function(err, discusses){
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
            return Task
                    .find({project: project}, null, {sort: [['create_at', -1]]})
                    .populate('todos')
                    .exec(function(err, tasks){
                        if(!err) {
                            return res.json(tasks);
                        }else {
                            return res.send(err);
                        }
                    });
        }
    });

};

exports.completedTodos = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id); // Project ID
    return Todo.find({project: id, completed: true}, function(err, todos) {

        if(!err) {
            res.json(todos);
        }else{
            return res.send(err);
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

exports.createTask = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id); // Project ID
    return Project.findById(id, function(err, project){
        if(!err) {
            var task = Task(req.body);
            task.project = project;
            task.creater = req.user;
            return task.save(function(err, task){
                if(!err) {
                    return res.json(task);
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


exports.remove = function(req, res) {

     var id = mongoose.Types.ObjectId(req.params.id); // Discuss ID
    return Project.find({_id: id}).remove(function(err, count){
        if(!err) {
            return res.json({});
        }else {
            return res.send(err);
        }
    });

};

exports.update = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    var obj = req.body;
    delete obj._id;
    delete obj.creater;
    delete obj.term;
    return Project.findOneAndUpdate({_id: id}, obj, function(err, task){
        if(!err) {
            return res.json(task);
        }else {
            return res.send(err);
        }
    });

};