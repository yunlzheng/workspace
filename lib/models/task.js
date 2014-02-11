'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: String,
    project: { type: Schema.ObjectId, ref: 'Project' },
    creater: { type: Schema.ObjectId, ref: 'User' },
    todos: [{ type: Schema.ObjectId, ref: 'Todo'}],
    create_at: { type: Date , default: Date.now }
});

/**
 * Validations
 */
 TaskSchema.path('name').validate(function (name) {
    return name.length
 }, 'Name cannot be blank');

 mongoose.model('Task', TaskSchema);