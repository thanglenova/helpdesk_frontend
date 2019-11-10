import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

<<<<<<< HEAD
  constructor(
    public auth: AuthService
  ) {
  }
=======
    constructor(
        public auth: AuthService
    ) { }

>>>>>>> master

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isLoggedIn()) {
      const authToken = this.auth.getAuthentication();
      request = request.clone({
        setHeaders:
          {Authorization: 'Bearer ' + authToken}
      });
    }

    return next.handle(request);
  }
}
