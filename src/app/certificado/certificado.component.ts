import {Component, OnInit} from '@angular/core';
import {CertificadoService} from "../services/certificado.service";
import {CursosService} from "../services/cursos.service";

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent implements OnInit {
  displaySpinner: boolean  = true;
  arrayBuffer;


  constructor(private certificadoService: CertificadoService, private cursoService: CursosService) {
  }

  ngOnInit() {
    let cursoAbr = this.cursoService.getCursoAbrSeleccionado();

    this.certificadoService.obtenerCertificado(cursoAbr).subscribe(
      (res) => {
        this.displaySpinner = false;
        this.arrayBuffer = res
      });
  }

}
