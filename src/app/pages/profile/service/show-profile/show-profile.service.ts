import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Profile } from '../../../../shared/models/profile';
@Injectable({
  providedIn: 'root'
})
export class ShowProfileService {

  constructor(private http: HttpClient) { }

  getProfileFollowId(id: number): Observable<Profile> {
    let api = 'https://helpdesk-kunlez-novahub.herokuapp.com/api/profiles/user?idUser=' + id;
    return this.http.get<Profile>(api);
  }
}
