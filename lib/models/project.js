'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    info: String
});

mongoose.model('Project', ProjectSchema);