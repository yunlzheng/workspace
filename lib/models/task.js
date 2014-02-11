'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: String,
    project: { type: Schema.ObjectId, ref: 'Project' },
    creater: { type: Schema.ObjectId, ref: 'User' },
    create_at: { type: Date , default: Date.now }
});

TaskSchema.virtual('todos').get(function(){
      return [];
});

/**
 * Validations
 */
 TaskSchema.path('name').validate(function (name) {
    return name.length
 }, 'Name cannot be blank');

 mongoose.model('TaskList', TaskSchema);