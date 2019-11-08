import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenService } from "src/app/core/services/token.service";
import { Observable } from "rxjs";
import { Request } from "../../../../shared/models/request";
import { environment } from "src/environments/environment";
import { ShowProfileService } from "src/app/pages/profile/service/show-profile/show-profile.service";
import { Profile } from "src/app/shared/models/profile";
import { AuthService } from "src/app/core/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class RequestService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private showProfileService: ShowProfileService,
    private authService: AuthService
  ) {}

  postRequest(request: Request){
    console.log(request);
    let api = "http://localhost:8081/api" + "/requests";
    return this.http.post(api, request);
  }
}
