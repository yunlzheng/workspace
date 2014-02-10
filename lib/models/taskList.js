'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskListSchema = new Schema({
    name: String,
    project: { type: Schema.ObjectId, ref: 'Project' },
    creater: { type: Schema.ObjectId, ref: 'User' }
});

TaskListSchema.virtual('tasks').get(function(){
      return [];
});

/**
 * Validations
 */
 TaskListSchema.path('name').validate(function (name) {
    return name.length
 }, 'Name cannot be blank');

 mongoose.model('TaskList', TaskListSchema);