'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artist_schema = Schema({
    name: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Artist', artist_schema);
