import {curso} from "./curso-model";
import {Request, Response} from 'express';
import {sessionStore} from "../user/session-store";
import {encuestaContestadaPorUsuario} from "../encuestas/respuestas-mongo";


export function obtenerCursos(request: Request, response: Response) {

  const sessionId = request.cookies["SESSIONID"];

  const isSessionValid = sessionStore.isSessionValid(sessionId);

  if (!isSessionValid) {
    response.sendStatus(403);
  } else {
    curso.find(function (err, cursos) {
      if (err) {
        console.error(err)
      }
      response.status(200).json(cursos)
    })
  }
}

export async function encuestaContestada(req: Request, res: Response) {
  const sessionId = req.cookies['SESSIONID'];
  const user = await  sessionStore.findUserBySessionId(sessionId);

  const cursoAbr = req.body.cursoAbr
  if (!user) {
    res.sendStatus(403)
  } else {
    encuestaContestadaPorUsuario(user, cursoAbr).then(
      (encuesta) => {
        if (encuesta) {
          res.status(200).json(true);
        } else {
          res.status(200).json(false);
        }
      }
    )
  }


}


