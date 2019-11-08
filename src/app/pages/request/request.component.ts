import { Component, OnInit } from "@angular/core";
import { RequestType } from "src/app/shared/models/requestType";
import { RequestTypeService } from "./service/requestType/request-type.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { RequestService } from "./service/request/request.service";
import { Request } from "src/app/shared/models/request";
import { AuthService } from "src/app/core/services/auth.service";
import { Profile } from "src/app/shared/models/profile";

@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.scss"]
})
export class RequestComponent implements OnInit {
  private idRequestTypeSelect: number = -1;
  private dayRequestSelect;
  private desciption: string = "";
  private requestTypes: RequestType[];
  private activeSendRequest = false;
  private user: Profile;

  constructor(
    private requestTypeService: RequestTypeService,
    private message: NzMessageService,
    private requestService: RequestService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadRequestType();
    this.loadUser();
  }

  loadRequestType() {
    this.requestTypeService.getAllTypeRequest().subscribe(
      data => {
        this.requestTypes = data;
      },
      error => {
        this.message.error("Load request type error");
      }
    );
  }

  loadUser() {
    this.authService.getProfileCurrent().subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }

  sendRequest(): void {
    this.activeSendRequest = true;
    if (
      this.idRequestTypeSelect == -1 ||
      this.dayRequestSelect == null ||
      this.desciption.trim() === ""
    ) {
      this.message.error("Something is wrong. Please check error!");
      if (this.desciption.trim() === "") {
        this.desciption = "";
      }
    } else {
      let requestType = this.getExactlyRequestTypeFollowId(
        this.idRequestTypeSelect
      );
      this.requestService.postRequest(new Request());
      let request: Request = new Request({
        dayRequest: this.dayRequestSelect,
        description: this.desciption,
        requestType: requestType,
        user: this.user
      });

      this.requestService.postRequest(request).subscribe(
        data => {
          this.message.success("Post request success");
          this.refreshDataInput();
        },
        error => {
          this.message.error("Post request error");
        }
      );
    }
  }

  getExactlyRequestTypeFollowId(id: number): RequestType {
    for (let i = 0; i < this.requestTypes.length; ++i) {
      if (this.requestTypes[i].id == id) {
        return this.requestTypes[i];
      }
    }
  }

  refreshDataInput() {
    this.dayRequestSelect = null;
    this.desciption = "";
  }
}
