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
    var page = request.params.page?request.params.page:1;
    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total)=>{
        if(err){
            response.status(500).send({message:'Error en la peticion.'});
        }else{
            if(!artists){
                response.status(404).send({message:'No hay artistas.'});
            }else{
                return response.status(200).send({total_item:total, artists:artists});
            }
        }
    });

}

function updateArtist(request, response) {
    var artista_id = request.params.id;
    var update=request.body;
    Artist.findByIdAndUpdate(artista_id, update,(err, artis_update)=>{
        if(err){
            response.status(404).send({message: 'Error a el actualizar el artista'});
        } else{
            if(!artis_update){
                response.status(404).send({message: 'No existe el artista'});
            }else{
                response.status(404).send({message: artis_update});
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

function deleteArtist(request, response) {
    var artist_id = request.params.id;

    Artist.findByIdAndRemove(artist_id, (err, artis_delete)=>{
        if(err){
            response.status(500).send({message:'Error a el eliminar el artista'});
        }else{
            if(!artis_delete){
                response.status(404).send({message:'Error a el elminar el artista.'});
            }else{
                Album.find({artist:artis_delete._id}).remove((err, albun_remove)=>{
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
                                        response.status(200).send({menssage:artis_delete})
                                    }
                                }
                            });
                        }


                    }
                });
            }
        }
    });
}

function uploadImage(request, response) {
    var user_id = request.params.id;
    var file_name = 'No subida';
    if(request.files){
        var file_path = request.files.image.path;
        console.log(file_path);
        var file_split = file_path.split('/');
        console.log(file_split[2]);
        var file_name =file_split[2];
        var ext_file = file_split[2].split('\.');
        if (ext_file[1] =='png' || ext_file[1] =='jpg' || ext_file[1] =='jpeg' ||ext_file[1] =='git' ){
            Artist.findByIdAndUpdate(user_id, {image:file_name},(err, userUpdated)=>{
                if (err){
                  console.log(err);
                    response.status(500).send({menssage:'Error a el actualizar el usuario'});
                }else{
                    if(!userUpdated){
                        response.status(404).send({menssage:'No se ha podido actualizar los usuarios'});
                    }else{
                        response.status(200).send({user:userUpdated});
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


function getImageFile(request, response){
    var ima_file=request.params.imageFile;
    var path_file ='./uploads/artists/'+ima_file;
    fs.exists(path_file, function(exists){
        if(exists){
            response.sendFile(path.resolve(path_file));
        }else{
            response.status(200).send({menssage:'No exiiste la imagen'});
        }
    })
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}