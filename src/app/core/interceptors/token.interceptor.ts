
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        public auth: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.auth.currentUser;
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    'token-google': `${this.auth.getTokenGoogle()}`
                }
            });
        }
        return next.handle(request);
    }
}