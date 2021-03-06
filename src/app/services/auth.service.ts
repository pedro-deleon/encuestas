import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model/User";
import {filter, map, shareReplay, tap} from "rxjs/operators";
import {Router, UrlTree} from "@angular/router";
import {IRequestResetPassword} from "../reset/reset.component";


export const ANONYNOUS_USER : User= {
  _id: undefined,
  email: undefined,
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  password: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User>(undefined);
  user$: Observable<User> = this.subject.asObservable().pipe(
    filter(user => !!user)
  )

  isLoggedIn$: Observable<boolean> = this.user$.pipe(
    map(user => !!user.email)
  )

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map(isLoggedIn => !isLoggedIn)
  );

  isLoggedInAuthorize$: Observable<boolean | UrlTree> = this.isLoggedIn$.pipe(
    map(isLoggedIn =>{
      return isLoggedIn ? true : this.router.parseUrl('/login') ;
    })
  )

  isLoggedOutDisplay$: Observable<boolean | UrlTree> = this.isLoggedOut$.pipe(
      map(isLoggedOut => {
        return isLoggedOut ? true : this.router.parseUrl('/encuestas');
      })
  )

  constructor(private http: HttpClient, private router: Router) {
    http.get('/api/user')
      .subscribe((user: User) => {this.subject.next( user  ? user : ANONYNOUS_USER)})
  }

  signup(user){
    return this.http.post<User>('/api/signup', user).pipe(
      shareReplay(),
      tap(user=> {this.subject.next(user);})
    );
  }

  login(email:string, password:string){
    return this.http.post<User>('/api/login', {email,password}).pipe(
      shareReplay(),
      tap(user=> {
        this.subject.next(user);
        window.localStorage.setItem("user", JSON.stringify(user));
      })
    );
  }

  logout() : Observable<any>{
      return this.http.post('/api/logout',null).pipe(
        shareReplay(),
        tap(user =>
          {
            this.subject.next(ANONYNOUS_USER);
            window.localStorage.removeItem("user");
          })
      )
  }

  updateUser(user: User) : Observable<any>{
    return this.http.post('/api/user', {user: user});
  }


  forgot(email: string): Observable<any>{
    return this.http.post('/api/forgot', {
      email: email
    });
  }

  reset(iRequestResetPasswod: IRequestResetPassword):Observable<any>{
    return this.http.post('/api/reset',iRequestResetPasswod);
  }
}
