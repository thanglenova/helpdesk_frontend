import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = "";
  errorData: {};
  redirectUrl: string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`)
    }
    this.errorData = {
      errorTitle: 'Request failed',
    }
    return throwError(this.errorData);
  }

  //login with gg
  loginGoogle(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': token
      })
    };
    return this.http.get<any>('https://helpdesk-kunlez-novahub.herokuapp.com/api/auth', httpOptions)
  }

  isLoggedIn() {
    if (localStorage.getItem(`currentUser`)) {
      return true;
    }
    return false;
  }

  getAuthentication() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  getToken(): string {
    return localStorage.getItem('currentUser');
  }

  getTokenGoogle() {
    let token_value = JSON.parse(this.getToken());
    return token_value.token
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

}
