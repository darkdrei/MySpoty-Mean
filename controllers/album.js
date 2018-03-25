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

function getAlbum(request, response){
    var album_id = request.params.id;
    Album.findById(album_id).populate({path:'artist'}).exec((err,album)=>{
        if(err){
            response.status(500).send({message:'Error en la peticion.'})
        }else{
            if(!album){
                response.status(404).send({message:'No existe el album'})
            }else{
                response.status(200).send({message:album})
            }
        }
    });
}


function getAlbums(request, response) {
    var artist_id = request.params.artist?request.params.artist:0;
    if(artist_id==0){
        var find = Album.find({}).sort('title');
    }else{
        var find = Album.find({artist:artist_id}).sort('year');
    }
    find.populate({path: 'artist'}).exec((err, albums)=>{
        if(err){
            response.status(500).send({menssage:'Error en la peticion'});
        }else{
            if(!albums){
                response.status(404).send({menssage:'No existen datos en la peticion'});
            }else{
                response.status(200).send({albums:albums});
            }
        }
    })
}

function updateAlbum(request, response) {
    var album_id = request.params.id;
    var update=request.body;
    Album.findByIdAndUpdate(album_id, update,(err, album_update)=>{
        console.log(err);
        if(err){
            response.status(404).send({message: 'Error a el actualizar el artista'});
        } else{
            if(!album_update){
                response.status(404).send({message: 'No existe el Album'});
            }else{
                response.status(404).send({message: album_update});
            }
        }
    });
}

function deleteAlbum(request, response) {
    var artist_id = request.params.id;
    Album.findByIdAndRemove(artist_id, (err, albun_remove)=>{
        if(err){
            response.status(500).send({menssage:'Error a el eliminar el album'});
        }else{
            if(!albun_remove){
                response.status(500).send({menssage:'Error a el eliminar el album'});
            }else{
                Song.find({album:albun_remove._id}).remove((err, albun_remove)=>{
                    if(err){
                        response.status(404).send({menssage:'Error a el eliminar la cancion.'});
                    }else{
                        if(!albun_remove){
                            response.status(500).send({menssage:'El albun no ha sido eliminado'});
                        }else{
                            response.status(200).send({menssage:albun_remove})
                        }
                    }
                });
            }


        }
    });

}



function saveAlbum(request, response) {
    var album = new Album();
    var params = request.body;
    album.title = params.title;
    album.description = params.description;
    album.image = 'null';
    album.year = params.year;
    album.artist = params.artist;
    album.save((err, albumStored)=>{
        if(err){
            response.status(500).send({menssage:'Erros a el guardar el album'});
        }else{
            if(!albumStored){
                response.status(404).send({menssage: 'Album no guardado.'})
            }else{
                response.status(200).send({message: albumStored});
            }
        }

    });
}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum
};