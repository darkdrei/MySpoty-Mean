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

function getArtist(request, response) {
    response.status(200).send({menssage: 'Método de getArtist controlador Artis'});
}

function getArtist(request, response){
    var artist_id = request.params.id;
    Artist.findById(artist_id, (err,artis)=>{
        if(err){
            response.status(500).send({message:'Error en la peticion.'})
        }else{
            if(!artis){
                response.status(404).send({message:'No existe el artista'})
            }else{
                response.status(200).send({message:artis})
            }
        }
    });
}

function getArtists(request, response) {
    var page = request.params.page;
    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total)=>{
        if(err){
            response.status(500).send({message:'Error en la peticion.'});
        }else{
            if(!artists){
                response.status(404).send({message:'No hay artistas.'});
            }else{
                return response.status(200).send({pages:total, artists:artists});
            }
        }
    });

}

function saveArtist(request, response) {
    var artist = new Artist();
    var params = request.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';
    artist.save((err, artistStored)=>{
       if(err){
           response.status(500).send({menssage:'Erros a el guardar el artista'});
       }else{
           if(!artistStored){
               response.status(404).send({menssage: 'Artista no guardado.'})
           }else{
               response.status(200).send({message: artistStored});
           }
       }

    });
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists
}