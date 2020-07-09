import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {passwordConfirmValidator} from "../support-elements/custom-validators";
// @ts-ignore
import {ERRORS_VALIDATE_PASSWORD} from "../support-elements/errors";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup
  errors: string[] = [];
  messagePerErrorCode = ERRORS_VALIDATE_PASSWORD;


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
            this.router.navigateByUrl('/encuestas')
          },
          response => this.errors = response.error.errors
        )
    }
  }

}
