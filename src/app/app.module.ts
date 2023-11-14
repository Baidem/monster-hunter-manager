import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { ErrorComponent } from './pages/error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ArmorListComponent } from './pages/armors/armor-list/armor-list.component';
import { ArmorDetailsComponent } from './pages/armors/armor-details/armor-details.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormErrorsComponent } from './components/form-errors/form-errors/form-errors.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArmorListComponent,
    ArmorDetailsComponent,
    SigninComponent,
    ErrorComponent,
    FormErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
