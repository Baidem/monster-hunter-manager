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
import { ArmorCardComponent } from './pages/armors/armor-card/armor-card.component';7
import { ArmorModalFormComponent } from './pages/armors/armor-modal-form/armor-modal-form.component';
import { ModalDeleteElementComponent } from './components/modal-delete-element/modal-delete-element.component';
import { ArmorSetsTableComponent } from './pages/armors/armor-sets-table/armor-sets-table.component';
import { ArmorSetsDetailsComponent } from './pages/armors/armor-sets-details/armor-sets-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArmorListComponent,
    ArmorDetailsComponent,
    SigninComponent,
    ErrorComponent,
    FormErrorsComponent,
    ArmorCardComponent,
    ArmorModalFormComponent,
    ModalDeleteElementComponent,
    ArmorSetsTableComponent,
    ArmorSetsDetailsComponent
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
