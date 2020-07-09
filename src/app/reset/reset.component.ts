import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
// @ts-ignore
import {ERRORS_VALIDATE_PASSWORD} from '../support-elements/errors';
import {anEnterLeave} from "../support-elements/animations";

export interface IRequestResetPassword {
  password: string;
  confirm: string;
  resetPasswordToken: string;
}


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  animations: [anEnterLeave]
})
export class ResetComponent implements OnInit {
  iRequestResetPassword: IRequestResetPassword;
  password = new FormControl('');
  passwordConfirm = new FormControl('');

  errors = [];
  errorsPassword = ERRORS_VALIDATE_PASSWORD;

  displayAlertInfo: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  reset() {
    this.iRequestResetPassword = {
      password: this.password.value,
      confirm: this.passwordConfirm.value,
      resetPasswordToken: this.route.snapshot.paramMap.get('token')
    }

    this.authService.reset(this.iRequestResetPassword).subscribe(
      res => {
        this.displayAlertInfo = true;
        setTimeout(() => this.router.navigateByUrl('/login'), 3000);
      },
      res => {
        this.errors = res.error;
      }
    );
  }

}
