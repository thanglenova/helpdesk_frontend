import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../../../shared/models/profile';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EditProfileService } from '../../service/edit-profile/edit-profile.service';

const URL = 'https://helpdesk-kunlez-novahub.herokuapp.com/api/profiles/avatar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {


  // ===>
  @Input() profile: Profile;
  @Input() fileToUpload: File;
  @Output() getValidateForm = new EventEmitter<boolean>();
  // ===>

  constructor(private msg: NzMessageService,
    private profileService: EditProfileService) {
  }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.profileService.uploadImage(this.fileToUpload).subscribe();
  }

  onChangeInput() {
    console.log(this.profile.sex);

    if (this.isStringvalidate(this.profile.firstName) || this.isStringvalidate(this.profile.lastName)
      || this.isStringvalidate(this.profile.address) || this.profile.startingDay == null
      || this.profile.birthday == null || this.profile.sex == null) {
      this.getValidateForm.emit(false);
    }
    else {
      this.getValidateForm.emit(true);
    }
  }

  isStringvalidate(data: string): boolean {
    if (data == null || data === "") {
      return true;
    }
    return false;
  }

}
