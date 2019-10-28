import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Observable, of} from 'rxjs';
import {Category} from 'src/app/shared/models/category';
import {catchError, tap} from 'rxjs/operators';

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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.serverUrl).pipe(
      catchError(this.handleError<Category[]>('getSkills'))
    );
  }

  getCategoryById(id: number): Observable<Category> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => console.log(`get category id ${id}`)),
      catchError(this.handleError<Category>('getCategoryById'))
    );
  }

  deleteCategory(cate: Category | number): Observable<Category> {
    const id = typeof cate === 'number' ? cate : cate.id;
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete<Category>(url).pipe(
      tap(_ => console.log(`delete category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  addCategory(name: string): Observable<Category> {
    return this.http.post<Category>(this.serverUrl, {name}).pipe(
      catchError(this.handleError<Category>('adddCategory'))
    );
  }

  searchCategory(valueSearch: string): Observable<Category> {
    return this.http.get<Category>(`${this.serverUrl}/search`).pipe(
      catchError(this.handleError<Category>('searchCategory'))
    );
  }

  updateCategory(cate: Category | number): Observable<Category> {
    const id = typeof cate === 'number' ? cate : cate.id;
    console.log(cate);
    return this.http.put<Category>(this.serverUrl, cate).pipe(
      catchError(this.handleError<Category>('updateCategory'))
    );
  }

}
