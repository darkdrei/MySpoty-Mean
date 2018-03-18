'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_schema = Schema({
    name: String,
    username: String,
    email: String,
    role: String,
    password: String,
    image: String
});

module.exports = mongoose.model('User', user_schema);
