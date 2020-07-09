import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormControl} from "@angular/forms";
import {anEnterLeave} from "../support-elements/animations";

@Component({
  selector: 'app-recovery',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  animations: anEnterLeave
})
export class ForgotComponent implements OnInit {


  email = new FormControl('');

  displayAlertError: boolean = false;
  displayAlertInfo: boolean =false;
  displayLoadingBar: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.displayLoadingBar = true;
    this.authService.forgot(this.email.value).subscribe(
      value => {
        this.displayLoadingBar = false;
        this.displayAlertInfo = true;
      },
      res => {
        this.displayLoadingBar = false;
        this.displayAlertError = true;
        setTimeout(() => {
            this.displayAlertError = false;
            this.email.reset();
          },
          3000);
      })
  }

}
