'use strict'

var jwt = require('jwt-simple');
var moment =  require('moment');
var secret = 'clave_secreta_curso';

exports.ensureAuth = function (request, response, next) {
    if(!request.headers.authorization){
        return response.status(403).send({message:'No contiene cabecera de autorizacion'})
    }
    var token = request.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return response.status(401).send({message:'Token expirado'});
        }
    }catch(ex){
        return response.status(404).send({message:'Token no valido'})
    }
     request.user= payload;
    next();
}