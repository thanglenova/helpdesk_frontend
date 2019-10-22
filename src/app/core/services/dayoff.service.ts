import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { DayOff } from 'src/app/shared/models/date-off';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DayoffService {
  private dayOffUrl="https://helpdesk-kunlez-novahub.herokuapp.com/api/day_offs"

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };

  constructor(
    private http: HttpClient,
    private alertService:AlertService
    ) {}

    private handleError<T> (operation ='operation', result?:T){
      return (error: any): Observable<T> => {
         console.error(error);
         this.alertService.error(`${operation} failed: ${error.alertService}`);
        return of(result as T);
      }
    }

    getDayoff(): Observable<DayOff[]>{
      return this.http.get<DayOff[]>(this.dayOffUrl).pipe(
       catchError(this.handleError<DayOff[]>('getDayOffs'))
      )
    }

    deleteDayOff(dayoff: DayOff | number): Observable<DayOff>{
      const id = typeof dayoff === 'number' ? dayoff: dayoff.id;
      const url = `${this.dayOffUrl}/${id}`;
  
      return this.http.delete<DayOff>(url, this.httpOptions).pipe(
        catchError(this.handleError<DayOff>('deleteDayOff'))
      );
    }

}
