'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TermSchema = new Schema({
    name: String,
    info: String,
    creater: { type: Schema.ObjectId, ref: 'User' },
    members: [{ type: Schema.ObjectId, ref: 'User' }],
    groups:[{ type: Schema.ObjectId, ref: 'Group'}]
});

/**
 * Validations
 */

 TermSchema.path('name').validate(function (name) {
    return name.length
 }, 'Name cannot be blank');

TermSchema.methods = {

    createProject:function(project, callback){

        this.model('Project').create(project, callback);

    },
    projects: function(callback){
        return this.model('Project').find({term: this}, callback);
    }

}

mongoose.model('Term', TermSchema);