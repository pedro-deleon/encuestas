import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../model/User";
import {CursosService, EncuestaContestada} from "../services/cursos.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  form: FormGroup;
  encuestasContestadas$: Observable<EncuestaContestada[]>;
  displayLoadingBar: boolean  = false;
  email: string;

  constructor(private authService: AuthService, private cursoService: CursosService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      nombre: new FormControl(''),
      apellidoPaterno: new FormControl(''),
      apellidoMaterno: new FormControl('')
    })


    this.authService.user$.subscribe(user => {
      this.email = user.email;
      this.form.controls.nombre.setValue(user.nombre);
      this.form.controls.apellidoPaterno.setValue(user.apellidoPaterno);
      this.form.controls.apellidoMaterno.setValue(user.apellidoMaterno);
    })


    this.encuestasContestadas$ = this.cursoService.obtenerCursosPorUsuario();
  }





  guardar() {
    this.displayLoadingBar = true;
    const val = this.form.value;
    let user: User = {} as User;
    user.email = this.email;
    user.nombre = val.nombre;
    user.apellidoPaterno = val.apellidoPaterno;
    user.apellidoMaterno = val.apellidoMaterno;
    this.authService.updateUser(user).subscribe((user)=>{
        this.form.controls.nombre.setValue(user.nombre);
        this.form.controls.apellidoPaterno.setValue(user.apellidoPaterno);
        this.form.controls.apellidoMaterno.setValue(user.apellidoMaterno);
        setTimeout(()=> this.displayLoadingBar =false , 2000)
      });
  }

  onVerCertificado(cursoAbr: string) {
    this.cursoService.setCursoAbr(cursoAbr);
    this.router.navigateByUrl('/encuestas/certificado')
  }
}
