import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowSkillsService } from '../../service/show-skills/show-skills.service';
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/shared/models/skill';
import { CommonService } from '../../service/common/common.service';
import { TokenService } from 'src/app/core/services/token.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ShowProfileService } from '../../service/show-profile/show-profile.service';

@Component({
  selector: 'app-show-skills',
  templateUrl: './show-skills.component.html',
  styleUrls: ['./show-skills.component.scss']
})
export class ShowSkillsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private skills: Skill[];
  private isUserLogin = false;

  constructor(private commonService: CommonService,
    private authService: AuthService,
    private tokenService : TokenService,
    private showProfileService: ShowProfileService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.showProfileService.getProfileFollowId(this.commonService.getIdProfileInParams()).subscribe(data => {
      this.skills = data.skills;
      
      if(this.tokenService.parseJwt(this.authService.getAuthentication()).sub == data.email){
        this.isUserLogin = true;
      }
    }, error => {
      console.log(error);
    })
  }
}
