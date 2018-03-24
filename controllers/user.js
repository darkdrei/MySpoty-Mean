'use strict'

var fs = require('fs');
var path = require('path');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../service/jwt');
function pruebas(request, response){
    response.status(200).send({
        menssage:'Probando una accion del controlador del api rest'
    });
}

function saveUser(request, response){
    var user = new User();
    var params = request.body;
    user.name= params.name;
    user.username=params.username;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image =' null';
    if(params.password){
        //ENcritar contraseña guardar dato
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.username != null && user.email != null){
                //guadar usuario
                user.save((error, userStored)=>{
                    if(error){
                        response.status(500).send({menssage: 'Error a el guardar un usuario'});
                    }else{
                        if(userStored){
                            response.status(200).send({user: userStored})
                        }else{
                            response.status(404).send({message:' No se registrado el usuario'});
                        }
                    }
                });
            }else{
                response.status(201).send({menssage: 'Introduce todos los campos.'});
            }
        })
        console.log('Esta en el metodo de insertar usuario')
    }else{
        response.status(201).send({menssage: 'Introduce la contraseña'});
    }
}


function loginUser(request, response){
    var params = request.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email:email.toLowerCase()}, (err, user)=>{
        if (err){
            response.status(500).send({menssage:'Error en la peticion'});
        }else{
            if(!user){
                response.status(404).send({menssage:'El usuario no existe'});
            }else{
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        //devolver los datos del usuario logueado
                        if(params.gethash){
                            //retorna el token de jwt
                            response.status(200).send({token:jwt.createToken(user)});
                        }else{
                            response.status(200).send({user});
                        }

                    }else{
                        response.status(404).send({menssage:'El usuario no ha podido autenticarse'});
                    }
                })
            }
        }
    })
}

function updateUser(request, response){
    var user_id = request.params.id;
    console.log(user_id);
    var update = request.body;
    User.findByIdAndUpdate(user_id, update, (err,  userUpdate)=>{
        if (err){
            response.status(500).send({menssage:'Error a el actualizar el usuario'});
        }else{
            console.log(userUpdate);
            if(!userUpdate){
                response.status(404).send({menssage:'No se ha podido actualizar los usuarios'});
            }else{
                response.status(200).send({user:userUpdate});
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
        if (ext_file[1] =='png' || ext_file[1] =='jpg' ||ext_file[1] =='git' ){
            User.findByIdAndUpdate(user_id, {image:file_name},(err, userUpdated)=>{
                if (err){
                  console.log(err);
                    response.status(500).send({menssage:'Error a el actualizar el usuario'});
                }else{
                    console.log(userUpdated);
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
    var path_file ='./uploads/users/'+ima_file;
    console.log(path_file)
    fs.exists(path_file, function(exists){
        if(exists){
            response.sendFile(path.resolve(path_file));
        }else{
            response.status(200).send({menssage:'No exiiste la imagen'});
        }
    })
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};
