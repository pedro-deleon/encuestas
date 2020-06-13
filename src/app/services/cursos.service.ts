import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Curso} from "../model/Curso";
import {PreguntaEncuesta} from "../model/Encuesta";


export interface EncuestaContestada {
  nombre: string,
  cursoAbr: string,
  respuestas: any[]
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursoSeleccionado: Curso;

  constructor(private http: HttpClient) {
  }


  getCursoSeleccionado(): Curso {
    return this.cursoSeleccionado;
  }

  getCursoAbrSeleccionado(): string {
    return localStorage.getItem('cursoAbr');
  }

  setCursoAbr(cursoAbr: string) {
    localStorage.setItem('cursoAbr', cursoAbr);
  }

  setCursoSeleccionado(curso: Curso) {
    this.cursoSeleccionado = curso;
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>('/api/cursos');
  }

  obtenerCursosPorUsuario(): Observable<EncuestaContestada[]> {
    return this.http.post<EncuestaContestada[]>('/api/cursos', {tortuga: 'tortuga'});
  }

  isEncuestaContestada(cursoAbr: string) {
    return this.http.post('/api/contestocurso', {cursoAbr: cursoAbr})
  }


}


// TODO Es confunso la manera en que agrego las respuestas de la encuesta en el usuario en el método de generar certificado
