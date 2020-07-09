import {Request, Response} from "express";
import {sessionStore} from "./session-store";

export async function getUser(req: Request, res: Response) {

  const sessionId = req.cookies['SESSIONID'];
  const user = await sessionStore.findUserBySessionId(sessionId);
  if (user) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      nombre: user.nombre,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno
    })
  } else {
    res.sendStatus(204);
  }


}
