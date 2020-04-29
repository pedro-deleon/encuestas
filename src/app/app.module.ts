import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuEncuestasComponent } from './menu-encuestas/menu-encuestas.component';
import { AngularPaComponent } from './menu-encuestas/encuestas/angular-pa/angular-pa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuEncuestasComponent,
    AngularPaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
