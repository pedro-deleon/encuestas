import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {passwordConfirmValidator} from "../support-elements/custom-validators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup
  errors: string[] = [];

  messagePerErrorCode = {
    min : 'La longitud mínima es de 10 caracteres',
    uppercase: 'Debe tener al menos una mayuscula',
    digits: 'Debe tener al menos un dígito',
    lowercase: 'Debe tener al menos una letra minúscula'
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nombre: new FormControl('',[Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl(''),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
    }, {validators: passwordConfirmValidator});
  }

  get email(){
    return this.form.get('email')
  }

  get nombre(){
    return this.form.get('nombre');
  }

  get apellidoPaterno(){
    return this.form.get('apellidoPaterno');
  }

  get password(){
    return this.form.get('password');
  }

  signup(){
    console.log(this.password);
    const val = this.form.value;
    if(val.email){
      this.authService.signup({
        email: val.email,
        nombre: val.nombre,
        apellidoPaterno: val.apellidoPaterno,
        apellidoMaterno: val.apellidoMaterno,
        password: val.password
      })
        .subscribe(
          () => {
            console.log("Usuario creado correctamente");
            this.router.navigateByUrl('/encuestas')
          },
          response => this.errors = response.error.errors
        )
    }
  }

}
