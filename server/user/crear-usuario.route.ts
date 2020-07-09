import {Request, Response} from "express"
import {Usuario} from "./usuario-model";
import * as argon2 from "argon2";
import {validatePassword} from "../password-validator";
import {randomBytes} from "../secuirty.util";
import {sessionStore} from "./session-store";
import * as EmailValidator from 'email-validator';


export function crearUsuarioRoute(req: Request, res:Response){

  const user = req.body;

  const errors = validatePassword(user.password);


  // antes también se valida que exista un nombre, apellido paterno y materno

  if(!user.nombre || !user.apellidoPaterno){
    res.status(400).json('El nombre y un apellido obligatorio')
  }


  if(errors.length > 0){
    res.status(400).json({errors})
  }else if(!EmailValidator.validate(user.email)){
    res.status(400).json('El email debe ser válido')
  } else{
    createUserAndSession(res,user);
  }
}

async function createUserAndSession(res,user){
  user.password = await argon2.hash(user.password)

  let usuarioModel = new Usuario(user);

  const usuarioSave = await usuarioModel.save();


  const sessionId = await randomBytes(32).then(bytes=>bytes.toString('hex'))


  sessionStore.createSession(sessionId,user);

  res.cookie("SESSIONID", sessionId, {httpOnly: true, secure: true});

  await res.status(200).json({
    email: user.email,
    nombre: user.nombre,
    apellidoPaterno: user.apellidoPaterno,
    apellidoMaterno: user.apellidoMaterno
  });
}
