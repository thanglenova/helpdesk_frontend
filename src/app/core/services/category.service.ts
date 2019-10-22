import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Observable, of} from 'rxjs';
import {Category} from 'src/app/shared/models/category';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private serverUrl = 'https://helpdesk-kunlez-novahub.herokuapp.com/api/categories';

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

  // tslint:disable-next-line:jsdoc-format
  /** GET ALL category from server*/
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.serverUrl).pipe(
      catchError(this.handleError<Category[]>('getSkills'))
    );
  }

}
