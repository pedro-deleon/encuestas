import {Component, OnInit} from '@angular/core';
import {CertificadoService} from "../services/certificado.service";
import {CursosService} from "../services/cursos.service";
import {createAndDownloadBlobFile} from "../support-elements/functions";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent implements OnInit {
  displaySpinner: boolean  = true;
  arrayBuffer;
  faDownload = faDownload;


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


  download(){
    createAndDownloadBlobFile(this.arrayBuffer, 'certificado');
  }

}
