'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    info: String,
    term: { type: Schema.ObjectId, ref: 'Term' }
});

ProjectSchema.methods.disscusses = function(callback){

    return this.model('Discuss').find({ project: this }, callback);

};

ProjectSchema.methods.tasks = function(callback){

};

ProjectSchema.methods.docs = function(callback) {

};

ProjectSchema.methods.files = function(callback) {

}

mongoose.model('Project', ProjectSchema);