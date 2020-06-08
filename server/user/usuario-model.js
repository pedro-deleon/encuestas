"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var usuarioSchema = new mongoose.Schema({
    email: String,
    nombre: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    passwordDigest: { type: String, alias: 'password' },
    preguntasEncuesta: []
});
exports.Usuario = mongoose.model('usuarios', usuarioSchema);
