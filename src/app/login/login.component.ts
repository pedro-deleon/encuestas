import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";


import{
  trigger,
  style,
  animate,
  transition
} from "@angular/animations";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('enterLeave',[
      transition(':enter',[
        style({opacity:0}),
        animate('500ms', style({opacity: 1}))
      ]),
      transition(':leave',[
        style({opacity: 1}),
        animate('500ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  errorResponse: string;
  form: FormGroup


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  get email() {
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  login() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(() => {
            this.router.navigateByUrl('/encuestas');
          },
          (err) => {

            console.log(err)
            if(err.statusText === 'Gateway Timeout'){
              this.errorResponse = 'Error interno en el Servidor'
            }

            if(err.error.errorCode === '01'){
              this.errorResponse = err.error.mensaje;
            }

            setTimeout(() => {
              this.errorResponse = undefined;
            }, 3000)
          }
        )
    }
  }



}
