import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuEncuestasComponent } from './menu-encuestas/menu-encuestas.component';
import { LoginComponent } from './login/login.component';
import { AngularPaComponent } from './menu-encuestas/encuestas/angular-pa/angular-pa.component';

const routes: Routes = [
  {
    path: 'encuestas',
    component: MenuEncuestasComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'encuestas/angular-pa',
    component: AngularPaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
