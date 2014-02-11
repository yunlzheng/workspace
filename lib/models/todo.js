'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
    name: String,
    appoint: { type: Schema.ObjectId, ref: 'User' },
    create_at: { type: Date , default: Date.now },
    endtime_at: { type: Date },
    creater: { type: Schema.ObjectId, ref: 'User' }
});

/**
 * Validations
 * TODO: validate endtime_at 
 */
 TodoSchema.path('name').validate(function (name) {
    return name.length
 }, 'Name cannot be blank');

 mongoose.model('Todo', TodoSchema);