import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {CursosService} from "../services/cursos.service";
import {AuthService} from "../services/auth.service";
import {Curso} from "../model/Curso";

interface EncuestaContestada{
  APA: Observable<Object>;
}

@Component({
  selector: 'app-menu-encuestas',
  templateUrl: './menu-encuestas.component.html',
  styleUrls: ['./menu-encuestas.component.scss']
})
export class MenuEncuestasComponent implements OnInit {

  cursos$: Observable<Curso[]>
  isLoggedIn$;
  encuestasContestadas: EncuestaContestada;




  constructor(private activatedRoute: ActivatedRoute,
              private cursosService: CursosService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.cursos$ = this.cursosService.obtenerCursos();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.encuestasContestadas  = {} as EncuestaContestada;
    this.angularPAContestada('APA');
    this.authService.user$.subscribe(user => console.log(user));
  }


  angularPAContestada(cursoAbr: string){
    this.encuestasContestadas.APA =  this.cursosService.isEncuestaContestada(cursoAbr);
  }

  agregarCursoSeleccionado(curso: Curso){
    this.cursosService.setCursoSeleccionado(curso);
  }


}
