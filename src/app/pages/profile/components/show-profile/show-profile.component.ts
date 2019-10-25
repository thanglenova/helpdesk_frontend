import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShowProfileService } from '../../service/show-profile/show-profile.service';
import { EditProfileService } from '../../service/edit-profile/edit-profile.service';

import { Profile } from '../../../../shared/models/profile';
import { CommonService } from '../../service/common/common.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit, OnDestroy {

  private isVisible = false;
  private validateForm = true;
  private isUserLogin = false;
  private subscription: Subscription;
  private profile: Profile;
  private fileToUpload: File;
  private profileSendToEditProfile: Profile;
  private idUrl = this.commonService.getIdProfileInParams();

  constructor(private showProfileService: ShowProfileService,
    private editProfileService: EditProfileService,
    private commonService: CommonService,
    private tokenService: TokenService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadProfile();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProfile() {
    this.subscription = this.showProfileService.getProfileFollowId(this.idUrl).subscribe(data => {
      this.profile = data;
      this.profileSendToEditProfile = new Profile(this.profile);

      // is user login
      if (this.tokenService.parseJwt(this.authService.getAuthentication()).sub === this.profile.email
        || this.tokenService.parseJwt(this.authService.getAuthentication()).scopes.includes("ROLE_ADMIN")) {
        this.isUserLogin = true;
      }
    }, error => {
      console.log(error);
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.subscription = this.editProfileService.editProfile(this.profileSendToEditProfile).subscribe(data => {
      this.profile = this.profileSendToEditProfile;
      // set image
      this.showProfileService.getProfileFollowId(this.idUrl).subscribe(
        data => {
          this.profile.avatarBase64 = data.avatarBase64;
        })
    }, error => {
      console.log(error);
    })
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getValidateForm($event) {
    this.validateForm = $event;
  }
}
