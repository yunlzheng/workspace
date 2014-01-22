'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DiscussSchema = new Schema({
    content: String,
    author: { type: Schema.ObjectId, ref: 'User'},
    create_at: { type: Date , default: Date.now },
    project: { type: Schema.ObjectId, ref: 'Project' }
});

mongoose.model('Discuss', DiscussSchema);