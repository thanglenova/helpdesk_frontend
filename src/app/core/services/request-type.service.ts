import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestType } from '../../shared/models/request-type';
import { RequestModel } from 'src/app/shared/models/request';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  private url = environment.urlAPI +'/api/request-types'

  constructor(private httpClient: HttpClient) { }

  
}
