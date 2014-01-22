'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    info: String,
    email: String,
    password: String
});

UserSchema.methods.terms = function(callback) {
    return this.model('Term').find({creater: this}, callback);
};

UserSchema.methods.setPassword = function(password){
    this.password = password;
};

UserSchema.methods.checkPassword = function(password){
    return this.password === password;
};

mongoose.model('User', UserSchema);