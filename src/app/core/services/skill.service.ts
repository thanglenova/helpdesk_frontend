import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { Observable, of } from 'rxjs';
import { Skill } from 'src/app/shared/models/skill';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private serverUrl = 'https://helpdesk-kunlez-novahub.herokuapp.com/api/skills';    //Link API of the server

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'applicatiob/json',
      'Authorization:': 'Bearer'
    })
  };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.alertService.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  /**GET ALL skills from server */
  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.serverUrl).pipe(
     catchError(this.handleError<Skill[]>('getSkills'))
    )
  }
}
