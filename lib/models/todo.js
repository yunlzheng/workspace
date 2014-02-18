'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
    content: String,
    assignee: { type: Schema.ObjectId, ref: 'User' },
    due_at: { type: Date },
    run: { type: Boolean, default: false },
    runner: { type: Schema.ObjectId, ref: 'User' },
    completed: { type: Boolean, default: false },
    create_at: { type: Date , default: Date.now },
    creater: { type: Schema.ObjectId, ref: 'User' },
    project: { type: Schema.ObjectId, ref: 'Project' }
});

/**
 * Validations
 * TODO: validate endtime_at 
 */
 TodoSchema.path('content').validate(function (content) {
    return content.length
 }, 'Content cannot be blank');

 mongoose.model('Todo', TodoSchema);