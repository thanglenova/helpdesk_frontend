import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    
    constructor(
        public auth: AuthService
    ){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let currentUser = this.auth.currentUserValue;
        if(currentUser&&currentUser.token){
            request = request.clone({
                setHeaders: {
                    'token-google': `${this.auth.getTokenGoogle()}`
                }
            });
        }   
       
        return next.handle(request);
    }
}