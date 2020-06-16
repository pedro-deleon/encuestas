import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuEncuestasComponent} from './menu-encuestas/menu-encuestas.component';
import {LoginComponent} from './login/login.component';
import {AngularPaComponent} from './menu-encuestas/encuestas/angular-pa/angular-pa.component';
import {SignupComponent} from "./signup/signup.component";
import {AuthorizeGuard} from "./services/authorize.guard";
import {CertificadoComponent} from "./certificado/certificado.component";
import {RecoveryComponent} from "./recovery/recovery.component";
import {OnlyDisplayIfLoggedOutGuard} from "./services/only-display-if-logged-out.guard";
import {AccountComponent} from "./account/account.component";

const routes: Routes = [
  {
    path: 'encuestas',
    component: MenuEncuestasComponent,
    canActivate: [AuthorizeGuard],
    data: {
      breadcrumb: 'Encuestas'
    },
    children: [
      {
        path: 'angular-pa',
        component: AngularPaComponent,
        data: {
          breadcrumb: 'Angular Plataforma de Arranque'
        }
      },
      {
        path: 'certificado',
        component: CertificadoComponent,
        data: {
          breadcrumb: 'Certificado'
        }
      }
    ]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [OnlyDisplayIfLoggedOutGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [OnlyDisplayIfLoggedOutGuard]
  },
  {
    path: 'recovery',
    component: RecoveryComponent,
    canActivate: [OnlyDisplayIfLoggedOutGuard]
  },
  {
    path: 'cuenta',
    component: AccountComponent,
    canActivate: [AuthorizeGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
