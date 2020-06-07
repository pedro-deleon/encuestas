import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {User} from "../model/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>
  currentUser: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedOut$ = this.authService.isLoggedOut$;
    this.authService.user$.subscribe(
      (user) => this.currentUser = user
    );
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login')
    });
  }
}
