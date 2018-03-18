'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise; //Eliminar mensaje de mongose a el instanciarse
mongoose.connect('mongodb://localhost:27017/curso_mean', (err, res) => {
    if(err){
      throw err;
    }else{
      console.log("Ready........");
      app.listen(port, function(){
        console.log("Servidor del api res de musica escuchando en hhtp://localhost:"+port);
      })
    }
});
