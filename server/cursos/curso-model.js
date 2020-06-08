"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var cursoSchema = mongoose.Schema({
    nombre: String,
    instructor: String
});
exports.curso = mongoose.model('cursos', cursoSchema);
