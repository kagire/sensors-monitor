import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppService } from './services/app.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import {LocalStorageService} from './services/local-storage.service';
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CreateSensorComponent} from "./create-sensor.component";
import {AuthInterceptorInterceptor} from "./interceptors/auth-interceptor.interceptor";
//table
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
//guard
import {AuthGuard} from "./guards/auth-guard.guard";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {EditSensorFormComponent} from "./components/edit-sensor-form/edit-sensor-form.component";
import {CommonModule} from "@angular/common";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'home/create', component: CreateSensorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateSensorComponent,
    LoginFormComponent,
    EditSensorFormComponent
  ],
    imports: [
      BrowserModule,
      CommonModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      HttpClientModule,
      BrowserAnimationsModule,
      //=============================
      RouterModule.forRoot(routes),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
    ],
  providers: [
    AuthGuard,
    AppService,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
