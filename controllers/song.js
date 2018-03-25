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

function uploadFile(request, response) {
    var album_id = request.params.id;
    var file_name = 'No subida';
    console.log(request.files);
    if(request.files){
        var file_path = request.files.file.path;
        console.log(file_path);
        var file_split = file_path.split('/');
        console.log(file_split[2]);
        var file_name =file_split[2];
        var ext_file = file_split[2].split('\.');
        if (ext_file[1] =='mp3' || ext_file[1] =='ogg' || ext_file[1] =='mp4' ||ext_file[1] =='avi' ){
            Song.findByIdAndUpdate(album_id, {file:file_name},(err, songUpdated)=>{
                if (err){
                    response.status(500).send({menssage:'Error a el actualizar el song'});
                }else{
                    if(!songUpdated){
                        response.status(404).send({menssage:'No se ha podido actualizar el song'});
                    }else{
                        response.status(200).send({user:songUpdated});
                    }
                }
            });
        }else{
            response.status(200).send({message:'E>xtensión del archivo no valido'})
        }
    }else{
        response.status(200).send({message:'No ha subido una imagen'})
    }
}


function getSongFile(request, response){
    var ima_file=request.params.songFile;
    var path_file ='./uploads/songs/'+ima_file;
    fs.exists(path_file, function(exists){
        if(exists){
            response.sendFile(path.resolve(path_file));
        }else{
            response.status(200).send({menssage:'No exiiste la cancion'});
        }
    })
}


module.exports={
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    getSongFile,
    uploadFile
};