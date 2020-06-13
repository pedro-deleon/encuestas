import {Response, Request} from 'express';
import {Usuario} from "./usuario-model";
import {sessionStore} from "./session-store";

export async function actualizarUsuario(req: Request, res: Response) {

  const sessionId = req.cookies['SESSIONID'];
  const userSession =  await sessionStore.findUserBySessionId(sessionId);

  if (!userSession) {
    res.sendStatus(403);
  } else {
    const user = req.body.user;

    let docUser = await Usuario.findOne({email: user.email});

    docUser.nombre = user.nombre;
    docUser.apellidoPaterno = user.apellidoPaterno;
    docUser.apellidoMaterno = user.apellidoMaterno;

    let model = new Usuario(docUser);
    model.save().then(
      value => {


        res.status(200).json({
          nombre: value.nombre,
          apellidoPaterno: value.apellidoPaterno,
          apellidoMaterno: value.apellidoMaterno
        });
      },
      reason => console.log(reason));
  }

}





