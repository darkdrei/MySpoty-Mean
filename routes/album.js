/**
 * Created by dark on 24/03/18.
 */
'use strict'

var express = require('express');
var AlbumControler = require('../controllers/album');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/albums'});

api.get('/album/:id',md_auth.ensureAuth, AlbumControler.getAlbum);
api.post('/album',md_auth.ensureAuth, AlbumControler.saveAlbum);
//api.get('/artist/:id',md_auth.ensureAuth, ArtisControler.getArtist);
api.get('/albums/:artist',md_auth.ensureAuth, AlbumControler.getAlbums);
//api.put('/artist/:id',md_auth.ensureAuth, ArtisControler.updateArtist);
//api.delete('/artist/:id',md_auth.ensureAuth, ArtisControler.deleteArtist);
//api.post('/upload-image-artist/:id',[md_auth.ensureAuth, md_upload], ArtisControler.uploadImage);
//api.get('/get-image-artist/:imageFile', ArtisControler.getImageFile);


module.exports =api;