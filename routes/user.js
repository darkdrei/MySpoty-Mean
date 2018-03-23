'use strict'

var express = require('express');
var user_controller = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/probando-controlador',md_auth.ensureAuth, user_controller.pruebas);
api.post('/register', user_controller.saveUser);
api.post('/login', user_controller.loginUser);

module.exports = api;
