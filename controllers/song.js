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
    var song_id = request.params.id;

    Song.findById(song_id).populate({path:'album'}).exec((err, song)=>{
        if(err){
            response.status(500).send({menssage:'Error en la peticion'});
        }else{
            if(!song){
                response.status(500).send({menssage:'Song no actualizado'});
            }else{
                response.status(200).send({song:song});
            }
        }
    });
}
function getSongs(request, response) {
    var album_id = request.params.album;
    if(!album_id){
        var find = Song.find({}).sort('number');
    }else{
        var find = Song.find({album:album_id}).sort('number');
    }
    find.populate({path:'album', populate:{path:'artist', model:'Artist'}
    }).exec((err, songResponse)=>{
        if(err){
            response.status(500).send({menssage:'Error en la peticion'});
        }else{
            if(!songResponse){
                response.status(500).send({menssage:'no hay canciones'});
            }else{
                response.status(200).send({song:songResponse});
            }
        }
    });
}

function deleteSong(request, response) {
    var song_id =request.params.id;
    Song.findByIdAndRemove(song_id, (err, songRemove)=>{
         if(err){
            response.status(500).send({menssage:'Error en la peticion'});
        }else{
            if(!songRemove){
                response.status(500).send({menssage:'no hay canciones'});
            }else{
                response.status(200).send({song:songRemove});
            }
        }
    });
}

function updateSong(request, response) {
    var song_id = request.params.id;
    var update = request.body;

    Song.findByIdAndUpdate(song_id, update, (err, songUpdate)=>{
        if(err){
            response.status(500).send({menssage:'Error en la peticion'});
        }else{
            if(!songUpdate){
                response.status(500).send({menssage:'no hay Song'});
            }else{
                response.status(200).send({song:songUpdate});
            }
        }
    });
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
    saveSong,
    getSongs,
    updateSong,
    deleteSong
};