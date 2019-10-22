import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Request} from 'src/app/shared/models/request';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private serverUrl = 'https://helpdesk-kunlez-novahub.herokuapp.com/request';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.alertService.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** GET ALL requests */
  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.serverUrl).pipe(
      catchError(this.handleError<Request[]>('getRequests'))
    );
  }

  /** DELETE request */
  deleteRequest(request: Request): Observable<Request> {
    return this.http.delete<Request>(this.serverUrl).pipe(
      catchError(this.handleError<Request>('deleteRequest'))
    );
  }

}
