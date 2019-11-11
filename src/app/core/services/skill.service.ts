import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Observable, of} from 'rxjs';
import {Skill} from 'src/app/shared/models/skill';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private serverUrl = environment.apiUrl + '/skills';

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      'Authorization:': 'Bearer'
    })
  };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.serverUrl).pipe(
      catchError(this.handleError<Skill[]>('getSkills'))
    );
  }
}
