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

  constructor(private authService: AuthService, private cursoService: CursosService, private router: Router) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.form = new FormGroup({
        email: new FormControl(user.email),
        nombre: new FormControl(user.nombre),
        apellidoPaterno: new FormControl(user.apellidoPaterno),
        apellidoMaterno: new FormControl(user.apellidoMaterno)
      })
    })

    this.encuestasContestadas$ = this.cursoService.obtenerCursosPorUsuario();
  }

  guardar() {
    const val = this.form.value;
    let user: User = {} as User;
    user.email = val.email;
    user.nombre = val.nombre;
    user.apellidoPaterno = val.apellidoPaterno;
    user.apellidoMaterno = val.apellidoMaterno;


    this.authService.updateUser(user).subscribe(
      res => console.log(res)
    );
  }

  onVerCertificado(cursoAbr: string) {
    this.cursoService.setCursoAbr(cursoAbr);
    this.router.navigateByUrl('/encuestas/certificado')
  }
}
