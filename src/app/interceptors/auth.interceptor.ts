import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let toHandle = request;

    if(!request.url.includes('security')){
      const token = this.authService.token as string

      toHandle = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
    }

    return next.handle(toHandle);
  }
}
