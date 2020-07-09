import {Request, Response} from "express";
const crypto = require('crypto');
const nodemailer = require("nodemailer");
import {sessionStore} from "./session-store";
import {randomBytes} from "../secuirty.util";
import {Usuario} from "./usuario-model";

export async function forgot(req: Request, res: Response){
  const email = req.body.email;
  const token = await randomBytes(20).then(bytes => bytes.toString('hex'))
  const user = await Usuario.findOne({email: email})

  if(user){
    const sendEmailCorrecto = await sendMail(email,req.headers.host,token);


    if(sendEmailCorrecto == 1 ){
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      const userNew = await user.save();
      res.status(200).json({text: "Email enviado con éxito"});
    } else if(sendEmailCorrecto == 0){
      res.status(400).send("Ha ocurrido un error al enviar el correo");
    }



  }else{
    res.status(400).send('Email inválido');
  }
}


/**
 *
 * @param email
 * @param host
 * @param token
 * @return 1: Email enviado correcto 0: Email no enviado (Ocurrio un error).
 */
async function sendMail(email: string,host: string, token: string){
  try{
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dleonmxn@gmail.com",
        pass: process.env.PASSGMAIL
      }
    });


    let info = await transporter.sendMail({
      from: '"Pedro de León" <pedro.deleonr@uanl.mx>', // sender address
      to: email, // list of receivers
      subject: "Recuperación de Contraseña | Encuestas CDIS UANL", // Subject line
      text: `
      Estas recibiendo este email porque has solicitado un cambio de tu contraseña. Porfavor accede al siguiente link
      en tu navegador para completar el proceso:
      https://${host}/reset/${token}

      Si tu no has solicitado esto, porfavor ignora este mensaje y tu contraseña permanecera sin cambios.` // plain text body

    });
    return 1;
  }catch(e){
    console.log(e)
    return 0;
  }
}
