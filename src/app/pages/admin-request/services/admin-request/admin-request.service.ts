import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { RequestModel } from '../../../../shared/models/request/request';
import { RequestPageModel } from 'src/app/shared/models/request/request-page-model';

@Injectable({
  providedIn: 'root'
})
export class AdminRequestService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = 'http://localhost:8081/api/requests';

  constructor(private httpClient : HttpClient) { }

  getAllRequests(): Observable<RequestModel[]>{
    return this.httpClient.get<RequestModel[]>(this.url);
  }

  putRequest(request:RequestModel): Observable<RequestModel>{
    return this.httpClient.put<RequestModel>(this.url, request, this.httpOptions);
  }

  getSize(keyword:string):Observable<number>{
    let params = new HttpParams()
    .append('search', keyword);
    return this.httpClient.get<number>(this.url+'/get-size', {params:params});
  }

  getPageRequest(body):Observable<RequestModel[]>{
    let params = new HttpParams()
    .append('page', body.page)
    .append('items', body.items)
    .append('sortBy', body.sortBy)
    .append('search', body.search);

    return this.httpClient.get<RequestModel[]>(this.url + '/pagination-and-search', {params:params}).pipe();
  }
}
