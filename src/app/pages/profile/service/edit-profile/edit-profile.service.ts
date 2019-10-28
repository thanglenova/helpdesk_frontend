import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../../../shared/models/profile';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

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

    let api = environment.apiUrl + '/profiles';
    return this.http.put<Profile>( api,
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
    let api = environment.apiUrl + '/profiles/avatar';
    return this.http.put( api,
      formData, httpOptions);
  }
}
