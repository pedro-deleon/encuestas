import {Request, Response} from "express";
import {sessionStore} from "../user/session-store";
import {Usuario} from "../user/usuario-model";

export async function obtenerCursosTerminadosPorUsuario(req: Request, res: Response) {
  // Obtener un arreglo con objetos {nombreCurso, cursoAbrr}

  const sessionId = req.cookies['SESSIONID'];
  const user = sessionStore.findUserBySessionId(sessionId);

  if(!user){
    res.sendStatus(403);
  }else{
    const preguntasEncuestaPorUsuario = await Usuario.findOne({email: user.email}, 'preguntasEncuesta');
    res.status(200).json(preguntasEncuestaPorUsuario.preguntasEncuesta);
  }



}




