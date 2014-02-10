'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskListSchema = new Schema({
    name: String,
    creater: { type: Schema.ObjectId, ref: 'User' }
});

/**
 * Validations
 */
 TaskListSchema.path('name').validate(function (name) {
    return name.length
 }, 'Name cannot be blank');

 mongoose.model('TaskList', TaskListSchema);