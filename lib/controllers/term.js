'use strict';

var mongoose = require('mongoose'),
    Term = mongoose.model('Term'),
    Project = mongoose.model('Project');

/**
login user can export own terms and the terms who joinin
*/
exports.terms = function(req, res) {
    return Term.find(
        {
            $or: [{
                    creater: req.user
                }, {
                    members: {
                        $in: [req.user]
                    }
                }
            ]
        }, function(err, terms){
        if (!err) {
            return res.json(terms);
        } else {
            return res.send(err);
        }
    });
}

/**
only login user can create a new term
*/
exports.create = function(req, res) {

    var term = new Term(req.body);
    term.creater = req.user;

    return term.save(function(err, term){
        if (!err) {
            return res.json(term);
        } else {
            return res.send(err);
        }
    })
}

/**
term info can show for login user
*/
exports.show = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    return Term.findById(id, function(err, term){

        if(!err) {
            return res.json(term);
        }else {
            return res.send(err);
        }

    });

}

exports.projects = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    return Project.find({term: id}, function(err, projects){
        if(!err) {
            return res.json(projects);
        }else {
            return res.send(err);
        }
    })

}

/**
term only can be delete by it's owner
*/
exports.delete = function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id);
    return Term.find({_id: id, creater: req.user}).remove(function(err, count){
        if(!err) {
            return res.json({});
        }else {
            return res.send(err);
        }
    });
}

/**
term only can update by it;s owner
*/
exports.update = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    return Term.findOneAndUpdate({_id: id, creater: req.user}, req.body, function(err, term){
        if(!err) {
            return res.json(term);
        }else {
            return res.send(err);
        }
    });
}

/**

*/
exports.join = function(req, res) {

    return {};

}