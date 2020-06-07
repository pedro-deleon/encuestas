import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
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

  getCursoNombre(): string {
    return localStorage.getItem('nombreCurso')
  }

  setCursoAbr(cursoAbr: string) {
    localStorage.setItem('cursoAbr', cursoAbr);
  }

  setCursoNombre(cursoNombre: string) {
    localStorage.setItem('cursoNombre', cursoNombre);
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


  agregarRespuestas(preguntasEncuesta: PreguntaEncuesta[], curso: Curso) {
    return this.http.post('/api/encuesta', {preguntasEncuesta, curso});
  }

  isEncuestaContestada(cursoAbr: string) {
    return this.http.post('/api/contestocurso', {cursoAbr: cursoAbr})
  }


}
