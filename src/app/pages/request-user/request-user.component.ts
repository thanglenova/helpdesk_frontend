import { Component, OnInit } from "@angular/core";
import { RequestUserService } from "./service/request-user.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/core/services/auth.service";
import { Request } from "../../shared/models/request";
@Component({
  selector: "app-request-user",
  templateUrl: "./request-user.component.html",
  styleUrls: ["./request-user.component.scss"]
})
export class RequestUserComponent implements OnInit {
  private requestTypes;
  private selectedRequestType;
  private description: string;
  private selectedDate;
  private validateScope;

  constructor(
    private requestUserService: RequestUserService,
    private message: NzMessageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadListRequestType();
    this.initValidateScope();
  }

  initValidateScope() {
    this.validateScope = {
      requestType: false,
      description: false,
      selectedDate: false
    };
  }
  loadListRequestType() {
    this.requestUserService.getAllRequestType().subscribe(
      data => {
        this.requestTypes = data;
      },
      err => {
        this.message.error("load list request type");
      }
    );
  }

  onClickSendRequest() {
    if (!this.validateSendRequest()) {
      let profile = this.authService.getProfileCurrent();
      let requestType = this.getTypeRequestFromId(this.selectedRequestType);
      if (profile != null) {
        const request = new Request({
          user: profile,
          dayRequest: this.selectedDate,
          description: this.description,
          requestType: requestType
        });
        this.requestUserService.postRequest(request).subscribe(
          data => {
            this.message.success("send request success");
          },
          error => {
            this.message.error("Send request error");
          }
        );
      }
    }
  }

  getTypeRequestFromId(id: number) {
    for (let i = 0; i < this.requestTypes.length; ++i) {
      if (this.requestTypes[i].id == id) {
        return this.requestTypes[i];
      }
    }
  }

  validateSendRequest(): boolean {
    this.initValidateScope();

    if (this.selectedRequestType == null) {
      this.message.error(
        "Request type is null. Please shoose date Request type"
      );
      this.validateScope.requestType = true;
    }
    if (
      this.description == null ||
      this.description.length == 0 ||
      !this.description.trim()
    ) {
      this.message.error("description error empty. Please enter description");
      this.validateScope.description = true;
      this.description = "";
    }

    if (this.selectedDate == null) {
      this.message.error("Date is null. Please shoose date request");
      this.validateScope.selectedDate = true;
    }

    if (
      this.validateScope.requestType ||
      this.validateScope.description ||
      this.validateScope.selectedDate
    ) {
      return true;
    }
    return false;
  }
}
