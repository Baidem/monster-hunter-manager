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

    /** TODO
     * When the Api has had an authentication update,
     * we'll need to adapt this code so that the
     * authentication token is integrated into the header
     * of requests that require authentication.
     */
    // if(!request.url.includes('security')){
    //   const token = this.authService.token as string

    //   toHandle = request.clone({
    //     headers: request.headers.set('Authorization', `Bearer ${token}`)
    //   })
    // }

    return next.handle(toHandle);
  }
}
