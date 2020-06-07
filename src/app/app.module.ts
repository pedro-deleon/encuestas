import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PdfViewerModule} from "ng2-pdf-viewer";


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {MenuEncuestasComponent} from './menu-encuestas/menu-encuestas.component';
import {AngularPaComponent} from './menu-encuestas/encuestas/angular-pa/angular-pa.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RekBreadcrumbComponent} from './support-elements/rek-breadcrumb/rek-breadcrumb.component';
import {SignupComponent} from './signup/signup.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CertificadoComponent} from './certificado/certificado.component';
import {RecoveryComponent} from './recovery/recovery.component';
import {AccountComponent} from './account/account.component';
import {RekPasswordComponent} from "./support-elements/rek-password/rek-password.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuEncuestasComponent,
    AngularPaComponent,
    RekBreadcrumbComponent,
    SignupComponent,
    HeaderComponent,
    CertificadoComponent,
    RecoveryComponent,
    AccountComponent,
    RekPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PdfViewerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
