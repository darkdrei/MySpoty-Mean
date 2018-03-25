/**
 * Created by dark on 24/03/18.
 */

'use strict'

var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
var mongoosePaginate = require('mongoose-pagination');

function getAlbum(request, response) {
    response.status(200).send({menssage: 'Método de getArtist controlador Album'});
}

module.exports = {
    getAlbum
};