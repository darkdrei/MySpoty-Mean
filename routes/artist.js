/**
 * Created by dark on 24/03/18.
 */
'use strict'

var express = require('express');
var ArtisControler = require('../controllers/artist');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/artists'});

api.get('/artist',md_auth.ensureAuth, ArtisControler.getArtist);
api.post('/artist',md_auth.ensureAuth, ArtisControler.saveArtist);
api.get('/artist/:id',md_auth.ensureAuth, ArtisControler.getArtist);
api.get('/artists/:page?',md_auth.ensureAuth, ArtisControler.getArtists);
api.put('/artist/:id',md_auth.ensureAuth, ArtisControler.updateArtist);
api.delete('/artist/:id',md_auth.ensureAuth, ArtisControler.deleteArtist);
api.post('/upload-image-artist/:id',[md_auth.ensureAuth, md_upload], ArtisControler.uploadImage);
api.get('/get-image-artist/:imageFile', ArtisControler.getImageFile);


module.exports =api;