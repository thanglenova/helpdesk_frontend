import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { Skill } from "src/app/shared/models/skill";
import { CommonService } from "../../service/common/common.service";
import { TokenService } from "src/app/core/services/token.service";
import { AuthService } from "src/app/core/services/auth.service";
import { ShowProfileService } from "../../service/show-profile/show-profile.service";

@Component({
  selector: "app-show-skills",
  templateUrl: "./show-skills.component.html",
  styleUrls: ["./show-skills.component.scss"]
})
export class ShowSkillsComponent implements OnInit {
  public skills: Skill[];
  public isUserLogin = false;

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private tokenService: TokenService,
    private showProfileService: ShowProfileService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.showProfileService
      .getProfileFollowId(this.commonService.getIdProfileInParams())
      .subscribe(
        data => {
          this.skills = data.skills;
          if (
            this.tokenService
              .parseJwt(this.authService.getAuthentication())
              .scopes.includes("ROLE_ADMIN") ||
            this.tokenService.parseJwt(this.authService.getAuthentication())
              .sub == data.email
          ) {
            this.isUserLogin = true;
          }
        },
        error => {
          this.message.error("[ERROR] Show skill");
        }
      );
  }
}
