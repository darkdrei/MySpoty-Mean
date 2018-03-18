'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// Cargar rutas
var user_routes = require('./routes/user');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configuracion de cabeceras http

//Rutas base
app.use('/api', user_routes); //Especie de midaware

/*
app.get('/pruebas', function(request, response){
    response.status(200).send({message:'Bienvenido a el test jajaj'});
});*/

module.exports = app;
