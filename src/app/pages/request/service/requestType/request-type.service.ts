import { Injectable } from "@angular/core";
import { RequestType } from "../../../../shared/models/requestType";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { TokenService } from "src/app/core/services/token.service";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class RequestTypeService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllTypeRequest(): Observable<RequestType[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.tokenService.getToken
      })
    };
    let api = environment.apiUrl + "/request-types";
    return this.http.get<RequestType[]>(api, httpOptions);
  }
}
