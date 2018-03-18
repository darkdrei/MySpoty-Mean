'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

function pruebas(request, response){
  response.status(200).send({
    menssage:'Probando una accion del controlador del api rest'
  });
}

function saveUser(request, response){
  console.log('esto funciona ',request.body);
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

module.exports = {
  pruebas,
  saveUser
};
