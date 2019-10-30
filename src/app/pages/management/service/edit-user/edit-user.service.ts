import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  disableFollowIdUser(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.getAuthentication()
      })
    };

    return this.http.put('https://helpdesk-kunlez-novahub.herokuapp.com/api/users/disable?idUser=' + id, httpOptions)
  }

  enableFollowIdUser(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.getAuthentication()
      })
    };

    return this.http.put('https://helpdesk-kunlez-novahub.herokuapp.com/api/users/enable?idUser=' + id, httpOptions)
  }
}
