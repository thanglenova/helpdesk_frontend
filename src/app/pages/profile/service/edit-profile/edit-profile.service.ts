import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../../../shared/models/profile';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient) { }

  editProfile(profile : Profile) : Observable<Profile>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuaG5ndXllbkBub3ZhaHViLnZuIiwic2NvcGVzIjoiUk9MRV9BRE1JTixST0xFX0VNUExPWUVFUyxST0xFX1NFQ1JFVEFSWSIsImlhdCI6MTU3MTM4MjExMywiZXhwIjoxNTczOTc0MTEzfQ.OCb2q2PHKbYH6AMOiO9Wu9BUNcrb6ApgznEKhZAMjZo'
      })
    };

    return this.http.put<Profile>('https://helpdesk-kunlez-novahub.herokuapp.com/api/profiles',
                          profile, httpOptions);
  }

  uploadImage(image : File){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuaG5ndXllbkBub3ZhaHViLnZuIiwic2NvcGVzIjoiUk9MRV9BRE1JTixST0xFX0VNUExPWUVFUyxST0xFX1NFQ1JFVEFSWSIsImlhdCI6MTU3MTM4MjExMywiZXhwIjoxNTczOTc0MTEzfQ.OCb2q2PHKbYH6AMOiO9Wu9BUNcrb6ApgznEKhZAMjZo'
      })
    };
    const formData: FormData = new FormData();
    formData.append('avatar', image, image.name);

    return this.http.put('https://helpdesk-kunlez-novahub.herokuapp.com/api/profiles/avatar',
    formData, httpOptions);
  }
}
