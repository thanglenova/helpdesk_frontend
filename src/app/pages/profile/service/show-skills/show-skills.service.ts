import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill } from 'src/app/shared/models/skill';

@Injectable({
  providedIn: 'root'
})
export class ShowSkillsService {

  constructor(private http : HttpClient) { }

  getSkillFollowIdUser(idUser : number) : Observable<Skill[]>{
    return this.http.get<Skill[]>('https://helpdesk-kunlez-novahub.herokuapp.com/api/skills/user?idUser=' + idUser);
  }

}
