import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../../../shared/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  editProfile(profile: Profile): Observable<Profile> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.getAuthentication()
      })
    };

    return this.http.put<Profile>('https://helpdesk-kunlez-novahub.herokuapp.com/api/profiles',
      profile, httpOptions);
  }

  uploadImage(image: File) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.getAuthentication()
      })
    };
    const formData: FormData = new FormData();
    formData.append('avatar', image, image.name);

    return this.http.put('https://helpdesk-kunlez-novahub.herokuapp.com/api/profiles/avatar',
      formData, httpOptions);
  }
}
