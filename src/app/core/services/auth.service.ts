import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from 'src/app/shared/models/user';
import {HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = '';
  errorData: {};
  redirectUrl: string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.log(error);
      // console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`)
    }
    this.errorData = {
      errorTitle: 'Request failed',
    };
    return throwError(this.errorData);
  }

  // login with gg
  loginGoogle(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': token
      })
    };
    return this.http.get<any>('https://helpdesk-kunlez-novahub.herokuapp.com/api/auth', httpOptions);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthentication() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser;
  }

  getToken(): string {
    const temp = localStorage.getItem('currentUser').split(' ');
    return temp[1];
  }

  getTokenGoogle() {
    // tslint:disable-next-line:variable-name
    const token_value = JSON.parse(this.getToken());
    return token_value.token;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

}
