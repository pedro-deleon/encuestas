let mongoose = require('mongoose');



let usuarioSchema =  new mongoose.Schema({
  email: String,
  nombre: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  passwordDigest: {type: String, alias: 'password'},
  preguntasEncuesta: []
})

export const Usuario = mongoose.model('usuarios', usuarioSchema);
