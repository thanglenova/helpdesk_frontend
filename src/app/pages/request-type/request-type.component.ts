import { Component, OnInit } from '@angular/core';
import { RequestTypeService } from 'src/app/core/services/request-type.service';
import { RequestType } from 'src/app/shared/models/request-type';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.scss']
})
export class RequestTypeComponent implements OnInit {

  listRequestType : RequestType[];

  nameRequestTypeAdd : string;

  requestTypeEdit : RequestType;

  constructor(
    private requestTypeService : RequestTypeService
    ) { }

  ngOnInit() {
    this.getRequestTypes();
  }

  getRequestTypes(){
    this.requestTypeService.getRequestTypes().subscribe(requestTypes => {this.listRequestType = requestTypes}) 
  }

  postRequestType(){
    this.requestTypeService.postRequestType(this.nameRequestTypeAdd);
    this.getRequestTypes();
  }

  deleteRequestType(id : number){
    this.requestTypeService.deleteRequestType(id);
    this.getRequestTypes();
  }

  putRequestType(){
    this.requestTypeService.putRequestType(this.requestTypeEdit);
  }
}
