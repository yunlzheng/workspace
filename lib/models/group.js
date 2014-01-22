'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: String,
    info: String,
    users: [{type: Schema.ObjectId, ref: 'User'}]
});

mongoose.model('Group', GroupSchema);