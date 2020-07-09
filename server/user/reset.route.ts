import {Request, Response} from "express";
import {Usuario} from "./usuario-model";
import * as argon2 from "argon2";
import {validatePassword} from "../password-validator";

export async function reset(req: Request, res: Response) {
  /**
   * recibir los dos campos del password
   * validar que los dos campos sean iguales.
   * actualizar la contraseña solamente siguiendo las siguientes condiciones:
   * que la fecha de expiración sea mayor que la fecha actual
   * Guarda la nueva contraseña.
   */

  const password = req.body.password;
  const passwordConfirm = req.body.confirm;
  const resetPasswordToken = req.body.resetPasswordToken;

  const user = await Usuario.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpires: {$gt: Date.now()}
  });



  if (!user) {
    let errors = ['token']
    res.status(400).send(errors)
    return 0;
  }


  let errorsPassword = validatePassword(password);
  if (errorsPassword.length > 0) {
    res.status(400).json(errorsPassword)
    return 0;
  }

  if (password == passwordConfirm) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.password = await argon2.hash(password);
    user.save();
    res.status(200).json('OK');
  } else {
    errorsPassword = ['same'];
    res.status(400).send(errorsPassword);
    return 0;
  }


}
