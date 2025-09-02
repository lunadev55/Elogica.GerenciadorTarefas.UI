import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MaterialModule } from './shared/material.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProjectDetailComponent } from './features/projects/components/project-detail/project-detail.component';
import { ProjectListComponent } from './features/projects/components/project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    RouterOutlet,    
    SwalComponent,
    ProjectDetailComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
