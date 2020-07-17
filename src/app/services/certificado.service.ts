import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment'
import 'moment/locale/es'
import {Curso} from "../model/Curso";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {User} from "../model/User";
import {PreguntaEncuesta} from "../model/Encuesta";
import {CursosService} from "./cursos.service";

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  currentUser: User;


  constructor(private http: HttpClient, private authService: AuthService, private cursoService: CursosService) {
  }

  generarCertificado(pagina: string, curso: Curso, preguntasEncuesta: PreguntaEncuesta[]): Observable<any> {
    let fechaMoment = moment();
    moment.locale('es');
    fechaMoment.locale(false);
    let fechaEmision: string = fechaMoment.format('DD MMMM YYYY');
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    })


    let participante = `${this.currentUser.nombre} ${this.currentUser.apellidoPaterno} ${this.currentUser.apellidoMaterno}`

    return this.http.post<any>('/api/certificado',
      {
        email: this.currentUser.email,
        participante,
        pagina,
        fechaEmision,
        curso: curso,
        horasCurso: curso.horas,
        instructorCurso: curso.instructor,
        preguntasEncuesta,
        user: this.currentUser
      });
  }


  obtenerCertificado(cursoAbr: string) {

    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    })
    let nombre: string = `${this.currentUser.nombre} ${this.currentUser.apellidoPaterno} ${this.currentUser.apellidoMaterno}`
    return this.http.post('/api/obtenerCertificado', {nombre, cursoAbr,user:this.currentUser}, {responseType: "arraybuffer"});
  }

}
