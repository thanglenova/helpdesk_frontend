import { Component, OnInit } from '@angular/core';
import { AdminRequestService } from '../services/admin-request/admin-request.service';
import { StatusService } from '../services/status/status.service';
import { Observable } from 'rxjs';
import { RequestTypeService } from '../services/request-type/request-type.service';
import { RequestModel } from '../../../shared/models/request/request';
import { RequestType } from '../../../shared/models/request/request-type';
import { Status } from 'src/app/shared/models/request/status';
import { SelectItem } from 'primeng/components/common/selectitem';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClient } from '@angular/common/http';
import { RequestPageModel } from 'src/app/shared/models/request/request-page-model';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {

  statuss: SelectItem[];

  requests: RequestModel[];

  statusList: Status[] = [];

  selectedStatus: Status;

  sortBys: SelectItem[];

  sizeArray: number;

  requestPageModel : RequestPageModel;

  constructor(
    private adminRequestService: AdminRequestService,
    private statusService: StatusService,
    private requestTypeService: RequestTypeService,
    private httpClient: HttpClient
  ) {
    this.requestPageModel = new RequestPageModel();

    this.requestPageModel.page = 0;

    this.requestPageModel.items = 2;

    this.sortBys = [
      {label: "Create At", value:"Create At"},
      {label: "Email", value:"Email"},
      {label: "Request Type", value:"Request Type"},
      {label: "Status", value:"Status"}
    ]

    this.requestPageModel.search = "";

    this.requestPageModel.sortBy = "Create At";
  }

  ngOnInit() {
    this.sendRequestPage();
    this.getStatus();
    this.getSize();
  }

  getStatus() {
    this.statusService.getStatusList().subscribe(listStatus => {
      this.statusList = listStatus;
      this.statuss = [
        { label: this.statusList[0].name, value: this.statusList[0] },
        { label: this.statusList[1].name, value: this.statusList[1] },
        { label: this.statusList[2].name, value: this.statusList[2] }
      ]
    })
  }

  putRequest(request: RequestModel) {
    this.adminRequestService.putRequest(request);
  }

  onChange(event, request: RequestModel) {
    this.httpClient.put("http://localhost:8081/api/requests", request).subscribe(pu => console.log(pu));
  }

  getSize() {
    this.adminRequestService.getSize(this.requestPageModel.search).subscribe(size => {
      this.sizeArray = size;
    });
  }

  requestPage(event) {
    this.requestPageModel.items = event.rows;
    this.sendRequestPage();
  }

  sendRequestPage() {
    this.adminRequestService.getPageRequest(this.requestPageModel).subscribe(request => {
      console.log(this.requestPageModel);
      this.requests = request;
      this.getSize();
    });
  }

  changeSortBy(event){
    this.requestPageModel.sortBy = event.value;
    this.sendRequestPage();
  }

  searchRequest(){
    this.requestPageModel.page = 0;
    this.sendRequestPage();
  }
}
