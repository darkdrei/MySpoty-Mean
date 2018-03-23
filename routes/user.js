'use strict'

var express = require('express');
var user_controller = require('../controllers/user');

var api = express.Router();

api.get('/probando-controlador', user_controller.pruebas);
api.post('/register', user_controller.saveUser);
api.post('/login', user_controller.loginUser);

module.exports = api;
