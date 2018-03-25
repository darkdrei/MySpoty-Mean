/**
 * Created by dark on 25/03/18.
 */
/**
 * Created by dark on 24/03/18.
 */
'use strict'

var express = require('express');
var SongControler = require('../controllers/song');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/songs'});

api.get('/song/:id',md_auth.ensureAuth, SongControler.getSong);
api.post('/song',md_auth.ensureAuth, SongControler.saveSong);
//api.get('/artist/:id',md_auth.ensureAuth, ArtisControler.getArtist);
//api.get('/albums/:artist',md_auth.ensureAuth, AlbumControler.getAlbums);
//api.put('/album/:id',md_auth.ensureAuth, AlbumControler.updateAlbum);
//api.delete('/album/:id',md_auth.ensureAuth, AlbumControler.deleteAlbum);
//api.post('/upload-image-album/:id',[md_auth.ensureAuth, md_upload], AlbumControler.uploadImage);
//api.get('/get-image-album/:imageFile', AlbumControler.getImageFile);


module.exports =api;