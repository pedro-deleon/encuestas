let mongoose = require('mongoose');

let cursoSchema = mongoose.Schema(
  {
    nombre: String,
    instructor: String
  }
);

export const curso = mongoose.model('cursos', cursoSchema);



