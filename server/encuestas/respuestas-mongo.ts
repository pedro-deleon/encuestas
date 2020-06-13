import {Usuario} from "../user/usuario-model";

let mongoose = require('mongoose');


export async function agregarRespuestasPorUsuario(user, respuestas, curso, response) {


  const docUserByEmail = await Usuario.findOne({email: user.email});



  const encuesta = docUserByEmail.preguntasEncuesta.find(element => element.cursoAbr === curso.nombre_corto)


  /**
   * Regresa un 0 si la encuesta ya esta contestada
   * Regresa un 1 si la encuesta no ha sido contestada
   */
  if (encuesta) {
    return 0
  } else {
    docUserByEmail.preguntasEncuesta.push({nombre: curso.nombre, cursoAbr: curso.nombre_corto, respuestas})
    const res = await docUserByEmail.save();
    return 1;
  }

}


export async function encuestaContestadaPorUsuario(user,cursoAbr){
  const docUserByEmail = await Usuario.findOne({email: user.email});
  return docUserByEmail.preguntasEncuesta.find(element => element.cursoAbr === cursoAbr)
}



