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
api.put('/album/:id',md_auth.ensureAuth, AlbumControler.updateAlbum);
api.delete('/album/:id',md_auth.ensureAuth, AlbumControler.deleteAlbum);
api.post('/upload-image-album/:id',[md_auth.ensureAuth, md_upload], AlbumControler.uploadImage);
api.get('/get-image-album/:imageFile', AlbumControler.getImageFile);


module.exports =api;