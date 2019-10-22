import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Skill } from 'src/app/shared/models/skill';

@Injectable({
  providedIn: 'root'
})
export class EditSkillsService {

  constructor(private http: HttpClient) { }

  getAllCategoriesForSkill() : Observable<Category[]>{
    return this.http.get<Category[]>("https://helpdesk-kunlez-novahub.herokuapp.com/api/categories");
  }

  loadSkillsFollowIdCategories(idCategories : number): Observable<Skill[]> {
    return this.http.get<Skill[]>("https://helpdesk-kunlez-novahub.herokuapp.com/api/skills/categories?idCategories=" + idCategories);
  }
}
