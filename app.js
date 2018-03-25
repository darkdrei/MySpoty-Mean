'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// Cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configuracion de cabeceras http

//Rutas base
app.use('/api', user_routes); //Especie de midaware
app.use('/api', artist_routes);
app.use('/api', album_routes);

/*
app.get('/pruebas', function(request, response){
    response.status(200).send({message:'Bienvenido a el test jajaj'});
});*/

module.exports = app;
