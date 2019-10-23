import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../../../shared/models/profile';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ShowUserService {

  constructor(private http: HttpClient,
              private tokenService : TokenService) { }

  getListProfile() : Observable<Profile[]>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.tokenService.getToken
      })
    };
    return this.http.get<Profile[]>('https://helpdesk-kunlez-novahub.herokuapp.com/api/users', httpOptions);
  }
  
  get() : string {
    return "baba";
  }
}
