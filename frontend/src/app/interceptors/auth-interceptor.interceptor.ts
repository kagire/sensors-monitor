import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppService} from "../services/app.service";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private app: AppService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.app.isAuthenticated()){
      if (!request.headers.has("Authorization")) {
        request = request.clone({
          setHeaders: {
            Authorization: `Basic ${this.app.getToken()}`
          }
        });
      }
    }
    return next.handle(request);
  }
}
