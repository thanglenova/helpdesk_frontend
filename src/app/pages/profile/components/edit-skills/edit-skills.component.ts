import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/shared/models/skill';
import { ShowSkillsService } from '../../service/show-skills/show-skills.service';
import { Category } from 'src/app/shared/models/category';
import { EditSkillsService } from '../../service/edit-skills/edit-skills.service';
import { ShowProfileService } from '../../service/show-profile/show-profile.service';
import { EditProfileService } from '../../service/edit-profile/edit-profile.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from '../../service/common/common.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.scss']
})
export class EditSkillsComponent implements OnInit, OnDestroy {

  listOfTagOptions: Skill[];
  validateForm = false;
  private idUrl = this.commonService.getIdProfileInParams();
  private subscription: Subscription;
  private skills: Skill[];
  private categories: Category[];
  private skillFollowCategories: Skill[];
  private selectedCategory: Category = null;
  private listSkillFollowCategories: Skill[];
  private notifitionText: string;

  constructor(private showSkillService: ShowSkillsService,
    private editSkillService: EditSkillsService,
    private showProfileService: ShowProfileService,
    private editProfileService: EditProfileService,
    private modalService: NzModalService,
    private commonService: CommonService,
    private notification: NzNotificationService,
    private message: NzMessageService) { }

  ngOnInit() {
    console.log(this.idUrl);
    this.loadSkills();
    this.loadAllCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAllCategories() {
    this.subscription = this.editSkillService.getAllCategoriesForSkill().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  loadSkills() {
    this.subscription = this.showSkillService.getSkillFollowIdUser(this.idUrl).subscribe(
      data => {
        this.skills = data;
      }, error => {
        console.log(error);
      }
    )
  }

  loadSkillsFollowIdCategories(idCategories: number) {
    this.subscription = this.editSkillService.loadSkillsFollowIdCategories(idCategories).subscribe(
      data => {
        this.skillFollowCategories = data;
      }, error => {
        console.log(error);
      }
    )
  }

  changeCategories(value: { label: string; value: Category; age: number }): void {
    this.subscription = this.editSkillService.loadSkillsFollowIdCategories(this.selectedCategory.id).subscribe(
      data => {
        this.listSkillFollowCategories = data;
      }, error => {
        console.log(error);
      }
    )
  }

  onClickUpSkills(template: TemplateRef<{}>) {
    for (let i = 0; i < this.listOfTagOptions.length; i++) {
      if (this.listOfTagOptions[i].id != null) {
        this.skills.push(this.listOfTagOptions[i]);
      } else {
        let nameSkill = this.listOfTagOptions[i] + '';

        if (nameSkill.length > 10) {
          this.notifitionText = "data lager";
          this.notification.template(template);
        } else {
          if (!this.skillIsExistFollowName(nameSkill)) {
            if (this.selectedCategory == null) {
              if (this.selectedCategory == null) {
              }
            }
            this.skills.push(new Skill(0, nameSkill, this.selectedCategory));
          }
        }
      }
    }
  }

  onSaveSkills() {
    const modal = this.modalService.success({
      nzTitle: 'Skills saving',
      nzContent: 'Waiting................'
    });
    setTimeout(() => modal.destroy(), 2000);
    this.subscription = this.showProfileService.getProfileFollowId(this.idUrl).subscribe(
      data => {
        data.skills = this.skills;
        this.editProfileService.editProfile(data).subscribe(
          data => {
            const modal = this.modalService.success({
              nzTitle: 'SUSCESS',
              nzContent: 'Save skills is suscess'
            });
            setTimeout(() => modal.destroy(), 1000);
          },
          error => {
            console.log(error);
          }
        )
      },
      error => {
        console.log(error);
      }
    )
  }
  skillIsExistFollowName(nameSkill: string): boolean {
    for (let i = 0; i < this.skills.length; ++i) {
      if (this.skills[i].name.toLowerCase() == nameSkill.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  onCloseTagSkill(skill: Skill) {
    let indexDelete = this.getIndexSkillsFollowName(skill.name);
    this.skills.splice(indexDelete, indexDelete + 1);
  }

  getIndexSkillsFollowName(name: String): number {
    for (let i = 0; i < this.skills.length; ++i) {
      if (name === this.skills[i].name) {
        return i;
      }
    }
    return -1;
  }

  onChangeValidate(value: string) {
    if (this.selectedCategory != null && this.listOfTagOptions != null && this.listOfTagOptions.length != 0) {
      if (this.isMaxValue(value[value.length - 1], 70)) {
        this.validateForm = false;
        this.message.error("The skill is less than 70 characters long!!! Thank");
      } else {
        this.validateForm = true;
      }
    } else {
      this.validateForm = false;
    }
  }

  isMaxValue(value: string, count: number): boolean {
    if (value.length > count) {
      return true;
    }
    return false;
  }
}
