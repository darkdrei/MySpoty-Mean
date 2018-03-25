'use strict'

var express = require('express');
var user_controller = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'});

api.get('/probando-controlador',md_auth.ensureAuth, user_controller.pruebas);
api.post('/register', user_controller.saveUser);
api.post('/login', user_controller.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth, user_controller.updateUser);
api.post('/upload-image/:id',[md_auth.ensureAuth, md_upload], user_controller.uploadImage);
api.get('/get-image-user/:imageFile', user_controller.getImageFile);

module.exports = api;
