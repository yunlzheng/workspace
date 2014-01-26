'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    info: String,
    creater: { type: Schema.ObjectId, ref: 'User' },
    term: { type: Schema.ObjectId, ref: 'Term' }
});

ProjectSchema.methods = {
    disscusses: function(callback) {

        return this.model('Discuss').find({ project: this }, callback);

    },
    tasks: function(callback) {

    },
    docs: function(callback) {

    },
    files: function(callback) {

    }
};


mongoose.model('Project', ProjectSchema);