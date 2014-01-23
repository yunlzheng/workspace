'use strict';

var mongoose = require('mongoose'),
    Term = mongoose.model('Term');

exports.terms = function(req, res) {
    return Term.find({creater: req.user}, function(err, terms){
        if (!err) {
            return res.json(terms);
        } else {
            return res.send(err);
        }
    });
}

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

exports.show = function(req, res) {

    var id = mongoose.Types.ObjectId(req.params.id);
    return Term.find({_id:id, creater: req.user}, function(err, term){

        if(!err) {
            return res.json(term);
        }else {
            return res.send(err);
        }

    });

}

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