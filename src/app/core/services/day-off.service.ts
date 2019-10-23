import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { DayOff } from 'src/app/shared/models/date-off';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { TypeDay } from 'src/app/shared/models/type-day';

@Injectable({
  providedIn: 'root'
})
export class DayOffService {

  private serverUrl = 'https://helpdesk-kunlez-novahub.herokuapp.com/api/day_offs';   //url server

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'appliccation/json',
      'Authorization': 'Bearer'
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

  getDayOffs(id: number): Observable<DayOff> {
    return this.http.get<DayOff>(`${this.serverUrl}/user_of_year/${id}?year`).pipe(
      catchError(this.handleError<DayOff>('getDays'))
    );
  }


   /** POST: add a new request day off */
    addDayOff(dayOff: TypeDay){
      return this.http.post(this.serverUrl, dayOff,this.httpOptions).pipe(
        catchError(this.handleError<TypeDay>('addDayOff'))
      );
    }
}