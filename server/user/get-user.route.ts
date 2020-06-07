import {Request, Response} from "express";
import {sessionStore} from "./session-store";

export function getUser(req: Request, res: Response) {

  const sessionId = req.cookies['SESSIONID'];
  const user = sessionStore.findUserBySessionId(sessionId);

  if (user) {
    res.status(200).json({
      email: user.email,
      nombre: user.nombre,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno
    })
  } else {
    res.sendStatus(204);
  }


}
