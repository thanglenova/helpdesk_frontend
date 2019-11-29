import { Component, OnInit } from '@angular/core';
import { RequestTypeService } from 'src/app/core/services/request-type.service';
import { RequestType } from 'src/app/shared/models/request-type';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrls: ['./request-type.component.scss']
})
export class RequestTypeComponent implements OnInit {
  listRequestType: RequestType[];

  nameRequestTypeAdd: string;

  requestTypeEdit: RequestType;

  editId: number;

  deleteId: number;

  isVisibleModal = false;

  constructor(
    private requestTypeService: RequestTypeService,
    private httpClient: HttpClient,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getRequestTypes();
  }

  getRequestTypes() {
    this.requestTypeService.getRequestTypes().subscribe(requestTypes => {
      this.listRequestType = requestTypes;
    });
  }

  postRequestType() {
    this.requestTypeService.postRequestType(this.nameRequestTypeAdd).subscribe(
      _ => {
        this.listRequestType.push(_);
        this.resetNameRequestTypeAdd();
        this.message.success('Add new request type success');
      },
      error => {
        this.message.error(`${error.error}`);
      }
    );
  }

  deleteRequestType(id: number) {
    this.deleteId = id;
    this.isVisibleModal = true;
  }

  putRequestType(requestType: RequestType) {
    this.requestTypeService
      .putRequestType(requestType)
      .subscribe((requestTypes: any) => {
        this.listRequestType = requestTypes;
        this.editId = -1;
      });
  }

  setEditId(id: number) {
    this.editId = id;
  }

  handleOkDeleteModal(): void {
    this.requestTypeService.deleteRequestType(this.deleteId).subscribe(_ => {
      this.listRequestType = this.listRequestType.filter(
        requestType => requestType.id !== this.deleteId
      );
      this.isVisibleModal = false;
    });
  }

  handleCancelDeleteModal(): void {
    this.isVisibleModal = false;
  }

  resetNameRequestTypeAdd() {
    this.nameRequestTypeAdd = '';
  }
}
