import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestType } from '../../shared/models/request-type';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  private url = environment.urlAPI +'/api/request-types'

  constructor(private httpClient: HttpClient) { }

  getRequestTypes() : Observable<RequestType[]>{
    return this.httpClient.get<RequestType[]>(this.url);
  }

  postRequestType(nameRequestType : string){
    this.httpClient.post(this.url, nameRequestType)
  }

  deleteRequestType(id : number){
    let param = new HttpParams().append('id',id+"");
    this.httpClient.delete(this.url, {params:param});
  }

  putRequestType(requestType: RequestType){
    this.httpClient.put(this.url, requestType);
  }
}
