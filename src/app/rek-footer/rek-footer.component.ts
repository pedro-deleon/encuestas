import { Component, OnInit } from '@angular/core';
import {faBug} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'rek-footer',
  templateUrl: './rek-footer.component.html',
  styleUrls: ['./rek-footer.component.scss']
})
export class RekFooterComponent implements OnInit {
  faBug = faBug;

  constructor() { }

  ngOnInit() {
  }

}
