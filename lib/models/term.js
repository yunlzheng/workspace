'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TermSchema = new Schema({
    name: String,
    info: String,
    creater: { type: Schema.ObjectId, ref: 'User' },
    members: [{ type: Schema.ObjectId, ref: 'User' }],
    groups:[{ type: Schema.ObjectId, ref: 'Group'}],
    projects: [{ type: Schema.ObjectId, ref: 'Project'}]
});

mongoose.model('Term', TermSchema);