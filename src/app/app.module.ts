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
import {ForgotComponent} from './forgot/forgot.component';
import {AccountComponent} from './account/account.component';
import {RekPasswordComponent} from "./support-elements/rek-password/rek-password.component";
import { RekSpinnerComponent } from './support-elements/rek-spinner/rek-spinner.component';
import { ResetComponent } from './reset/reset.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RekFooterComponent } from './rek-footer/rek-footer.component';


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
    ForgotComponent,
    AccountComponent,
    RekPasswordComponent,
    RekSpinnerComponent,
    ResetComponent,
    RekFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    MatProgressBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
