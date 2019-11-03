import { Component, OnInit } from '@angular/core';
import { RequestTypeService } from 'src/app/core/services/request-type.service';
import { RequestType } from 'src/app/shared/models/request-type';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.scss']
})
export class RequestTypeComponent implements OnInit {

  listRequestType : RequestType[];

  nameRequestTypeAdd : string;

  requestTypeEdit : RequestType;

  editId: number;

  constructor(
    private requestTypeService : RequestTypeService,
    private httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.getRequestTypes();
  }

  getRequestTypes(){
    this.requestTypeService.getRequestTypes().subscribe(requestTypes => {this.listRequestType = requestTypes}) 
  }

  postRequestType(){
    this.requestTypeService.postRequestType(this.nameRequestTypeAdd).subscribe(
      _ => {this.listRequestType.push(_)}
      );
  }

  deleteRequestType(id : number){
    this.requestTypeService.deleteRequestType(id).subscribe(
      _ => {this.listRequestType = this.listRequestType.filter(requestType => requestType.id !== id)}
    );
  }

  putRequestType(requestType : RequestType){
    this.requestTypeService.putRequestType(requestType).subscribe(
      (requestTypes:any) => {
        this.listRequestType = requestTypes;
        this.editId = -1;
      }
    );
  }

  setEditId(id: number){
    this.editId = id;
  }
}
