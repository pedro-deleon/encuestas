import { Component, OnInit } from '@angular/core';
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'rek-spinner',
  templateUrl: './rek-spinner.component.html',
  styleUrls: ['./rek-spinner.component.scss']
})
export class RekSpinnerComponent implements OnInit {


  faCircle = faCircleNotch;


  constructor() { }

  ngOnInit() {
  }

}
