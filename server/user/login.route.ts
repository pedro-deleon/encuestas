import {Request, Response} from "express";
import {Usuario} from "./usuario-model";
import {User} from "../../src/app/model/User";
import * as argon2 from "argon2";
import {randomBytes} from "../secuirty.util";
import {sessionStore} from "./session-store";

export function login(req: Request, res: Response){
  const credentials = req.body;
  Usuario.findOne({email: credentials.email}, function(err, user){
    console.log(err)
    if(err) res.sendStatus(403);
    console.log(user)
    if(!user) {
      res.status(403).json({errorCode: '01', mensaje: 'Email o Contraseña inválido'});
    } else{
      loginAndBuildResponse(credentials,user,res);
    }
  });

}

async function loginAndBuildResponse(credentials: any, user, res: Response){

  try{

    const sessionId = await attemptLogin(credentials,user);
    console.log(`Usuario ${user.email} logeado con éxito`);
    res.cookie("SESSIONID", sessionId, {httpOnly: true, secure: true});
    res.status(200).json({
      email: user.email,
      nombre: user.nombre,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno
    });
  }catch(err){
    res.status(403).json({errorCode: '01', mensaje: 'Email o Contraseña inválido'});
  }

}

async function attemptLogin(credentials: any, user){


  const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password)
  if(!isPasswordValid){
    throw new Error('Password Invalid');
  }

  const sessionId = await randomBytes(32).then(bytes=>bytes.toString('hex'))

  sessionStore.createSession(sessionId,user);

  return sessionId;
}
