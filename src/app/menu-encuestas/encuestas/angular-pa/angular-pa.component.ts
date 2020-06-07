import {Component, OnDestroy, OnInit} from '@angular/core';
import {CertificadoService} from '../../../services/certificado.service';
import {CursosService} from "../../../services/cursos.service";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {PreguntaEncuesta} from "../../../model/Encuesta";

@Component({
  selector: 'app-angular-pa',
  templateUrl: './angular-pa.component.html',
  styleUrls: ['./angular-pa.component.scss']
})
export class AngularPaComponent implements OnInit, OnDestroy {

  email: string;
  pagina: string;
  isRekOpacity: boolean = false;
  displaySpinner: boolean = false;
  form: FormGroup;

  preguntas: string[];

  faCircle = faCircleNotch;

  constructor(private certificadoService: CertificadoService,
              private cursosService: CursosService,
              private router: Router) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      githubPage: new FormControl(''),
      1: new FormControl(''),
      2: new FormControl(''),
      3: new FormControl(''),
      4: new FormControl('')
    })

    this.preguntas = [
      `¿Como te pareció el formato del curso junto con las herramientas?. (Github, Videos En
      Linea, Guías).`,
      `¿Hay algo que te gustaría que se agregara a la capacitación?`,
      `¿Que puntos fuertes ves que tiene la capacitación?`,
      `Comentarios Adicionales (opcional)`
    ]
  }

  ngOnDestroy() {
  }


  onSubmit() {
    this.isRekOpacity = true;
    this.displaySpinner = true;
    let curso = this.cursosService.getCursoSeleccionado()


    let preguntasEncuesta: PreguntaEncuesta[] = this.formarObjetoRespuestasEncuesta();


    // Petición Server
    this.certificadoService.generarCertificado(this.form.value.githubPage, curso, preguntasEncuesta).subscribe((res) => {
        this.isRekOpacity = false;
        this.displaySpinner = false;
        this.cursosService.setCursoAbr(curso.nombre_corto);
        this.router.navigateByUrl('/encuestas/certificado')
      },
      (err) => {

      });
  }


  formarObjetoRespuestasEncuesta(): PreguntaEncuesta[] {
    let preguntasEncuesta: PreguntaEncuesta[] = [];


    preguntasEncuesta.push({
      num_pregunta: 1,
      pregunta: this.preguntas[0],
      respuesta: this.form.value["1"]
    })

    preguntasEncuesta.push({
      num_pregunta: 2,
      pregunta: this.preguntas[1],
      respuesta: this.form.value["2"]
    })

    preguntasEncuesta.push({
      num_pregunta: 3,
      pregunta: this.preguntas[2],
      respuesta: this.form.value["3"]
    })

    preguntasEncuesta.push({
      num_pregunta: 4,
      pregunta: this.preguntas[3],
      respuesta: this.form.value["4"]
    })

    return preguntasEncuesta;
  }


}
