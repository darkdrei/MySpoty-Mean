/**
 * Created by dark on 25/03/18.
 */
'use strict'

var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');
var mongoosePaginate = require('mongoose-pagination');


function getSong(request, response) {
    response.status(200).send({menssage:'Controlador de cancions'});
}

function saveSong(request, response) {
    var song = new Song();
    var params = request.body;
    song.name = params.name;
    song.number = params.number;
    song.duration = params.duration;
    song.album = params.album;
    song.file = 'null';
    song.save((err, songStored)=>{
        if(err){
            response.status(500).send({menssage:'Erros a el guardar el song'});
        }else{
            if(!songStored){
                response.status(404).send({menssage: 'Song no guardado.'})
            }else{
                response.status(200).send({message: songStored});
            }
        }

    });
}


module.exports={
    getSong,
    saveSong
};